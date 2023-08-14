const svc = require("../services");
class Settings{
    constructor(
        storeID,
        storeName,
        password,
        owner,
        street,
        houseNumber,
        zip,
        telephone,
        email
    ){
        this.storeID = storeID !== null && storeID !== undefined ? storeID : this.throwError("storeID");
        this.storeName = storeName !== null && storeName !== undefined ? storeName : this.throwError("storeName");
        this.password = password !== null && password !== undefined ? password : this.throwError("password");
        this.owner = owner !== null && owner !== undefined ? owner : this.throwError("owner");
        this.street = street !== null && street !== undefined ? street : this.throwError("street");
        this.houseNumber = houseNumber !== null && houseNumber !== undefined ? houseNumber : this.throwError("houseNumber");
        this.zip = zip !== null && zip !== undefined ? zip : this.throwError("zip");
        this.telephone = telephone !== null && telephone !== undefined ? telephone : this.throwError("telephone");
        this.email = email !== null && email !== undefined ? email : this.throwError("email");
    }

    validateSettings(settings){
        const settingsProperties = Object.values(settings);
        for (const property of settingsProperties) {
          if (property === undefined || property === null || property === "") {
            return false;
          }
        }
        return true;
    }

    throwError(property) {
        throw new Error(`Missing property ${property}`);
    }

    updateSettings(){
        return svc.storeService.setSettings(this);
    }

    get storeID(){
        return this._storeID;
    }

    set storeID(storeID){
        this._storeID = storeID;
    }

    get storeName(){
        return this._storeName;
    }

    set storeName(storeName){
        this._storeName = storeName;
    }

    get password(){
        return this._password;
    }

    set password(password){
        this._password = password;
    }

    get owner(){
        return this._owner;
    }

    set owner(owner){
        this._owner = owner;
    }

    get street(){
        return this._street;
    }

    set street(street){
        this._street = street;
    }

    get houseNumber(){
        return this._houseNumber;
    }

    set houseNumber(houseNumber){
        this._houseNumber = houseNumber;
    }

    get zip(){
        return this._zip;
    }

    set zip(zip){
        this._zip = zip;
    }

    get telephone(){
        return this._telephone;
    }

    set telephone(telephone){
        this._telephone = telephone;
    }

    get email(){
        return this._email;
    }

    set email(email){
        this._email = email;
    }

    get logo(){
        return this._logo;
    }

    set logo(logo){
        this._logo = logo;
    }

}

module.exports = Settings;