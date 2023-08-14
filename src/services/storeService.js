const uuid = require("uuid");
const fs = require("fs");
const path = require('path');

const UPLOAD_FOLDER = path.join(__dirname, '../public/Images/');

class StoreService{
    constructor(database, addressService, userService){
        this.database = database;
        this.addressService = addressService;
        this.userService = userService;
    }

    async addStore(store) {
        if (!store) {
            throw new Error("Missing parameters");
        }
    
        try {
            const storeExists = await this.doesStoreExist(store._storeName);
            console.log("doesStoreExist " + storeExists);
    
            if (!storeExists) {
                const storeZipID = await this.addressService.getZipID(store._zip);
                if (storeZipID !== null && storeZipID !== undefined) {
                    const addedAddress = await this.addressService.addAddress(
                        store._street,
                        store._houseNumber,
                        store._zip,
                        storeZipID
                    );
    
                    if (addedAddress) {
                        const storeAddressID = await this.addressService.getAddressID(
                            store._street,
                            store._houseNumber,
                            storeZipID
                        );
    
                        console.log("storeAddressID: " + storeAddressID);
    
                        if (storeAddressID !== null && storeAddressID !== undefined) {
                            const addedLoginCredentials = await this.userService.addLoginCredentials(
                                store._username,
                                store._password
                            );
    
                            console.log("addedLoginCredentials: " + addedLoginCredentials);
    
                            if (addedLoginCredentials) {
                                const logoImageBuffer = Buffer.from(store._logo, 'base64');
                                const logoImageFilename = uuid.v4();
                                const logoImageFilepath = path.join(UPLOAD_FOLDER, logoImageFilename + ".jpg");
                                fs.writeFileSync(logoImageFilepath, logoImageBuffer);
    
                                const backgroundImageBuffer = Buffer.from(store._backgroundImage, 'base64');
                                const backgroundImageFilename = uuid.v4();
                                const backgroundImageFilepath = path.join(UPLOAD_FOLDER, backgroundImageFilename + ".jpg");
                                fs.writeFileSync(backgroundImageFilepath, backgroundImageBuffer);
    
                                const addedStore = await this.database.insertStore(
                                    store._storeName,
                                    store._owner,
                                    logoImageFilename,
                                    backgroundImageFilename,
                                    store._telephone,
                                    store._email,
                                    storeZipID,
                                    storeAddressID,
                                    store._username
                                );
    
                                if (addedStore) {
                                    return "Store added";
                                } else {
                                    throw new Error("Store not added");
                                }
                            } else {
                                throw new Error("Login credentials not added");
                            }
                        } else {
                            throw new Error("AddressID not found");
                        }
                    } else {
                        throw new Error("Address not added");
                    }
                } else {
                    throw new Error("ZipID not found");
                }
            } else {
                throw new Error("Store already exists");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error adding store");
        }
    }
    

    async doesStoreExist(storeName) {
        try {
            const exists = await this.database.getExistingStore(storeName);
            return exists;
        } catch (error) {
            console.error(error);
            throw new Error("Error checking if store exists");
        }
    }
    

    async getSettings(storeID) {
        try {
            const store = await this.database.selectStoreByStoreID(storeID);
    
            if (store) {
                const address = await this.database.selectAddressByAddressID(store.ADDRESSID);
    
                if (address) {
                    const zip = await this.database.selectZIPByZipID(address.ZIPID);
    
                    if (zip !== null && zip !== undefined) {
                        const response = {
                            storeName: store.STORENAME,
                            owner: store.OWNER,
                            street: address.STREET,
                            houseNumber: address.HOUSENUMBER,
                            zip: String(zip.ZIP),
                            telephone: store.TELEPHONE,
                            email: store.EMAIL,
                        };
                        return response;
                    } else {
                        throw new Error("Zip could not be found");
                    }
                } else {
                    throw new Error("Address could not be found");
                }
            } else {
                throw new Error("Settings could not be found");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error getting store settings");
        }
    }
    

    async setSettings(settings) {
        try {
            console.log(settings);
    
            const zipID = await this.addressService.getZipID(settings._zip);
    
            if (zipID !== null && zipID !== undefined) {
                const old_addressID = await this.addressService.getAddressIDByStoreID(settings._storeID);
    
                console.log("AddressID" + old_addressID);
    
                if (old_addressID !== null && old_addressID !== undefined) {
                    const updatedAddress = await this.addressService.updateAddress(
                        old_addressID,
                        settings._street,
                        settings._houseNumber,
                        zipID
                    );
    
                    if (updatedAddress) {
                        const updatedStore = await this.database.updateStore(
                            settings._storeID,
                            settings._storeName,
                            settings._owner,
                            settings._telephone,
                            settings._email,
                            zipID,
                            old_addressID
                        );
    
                        if (updatedStore) {
                            return true;
                        } else {
                            throw new Error("Store update failed");
                        }
                    } else {
                        throw new Error("Address could not be updated");
                    }
                } else {
                    throw new Error("Address not found");
                }
            } else {
                throw new Error("ZIP code not found");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error updating settings");
        }
    }
    

}

module.exports = StoreService;