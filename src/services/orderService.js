class OrderService {
    constructor(database, addressService) {
        this.database = database;
        this.addressService = addressService;
    }

    async addOrder(order) {
        try {
            if (!order ||
                !order.zip ||
                !order.street ||
                !order.houseNumber ||
                !order.timestamp ||
                !order.employeeName ||
                !order.packageSize ||
                !order.deliveryDate ||
                !order.storeID ||
                !order.handlingInfo ||
                !order.firstName ||
                !order.lastName
            ) {
                throw new Error("Required order information is missing");
            }

            const zipID = await this.addressService.getZipID(order.zip);
            if (zipID === null || zipID === undefined) {
                throw new Error("ZipID could not be retrieved");
            }

            console.log("gotZipID: " + zipID);

            let addressID = await this.addressService.getAddressID(order.street, order.houseNumber, zipID);
            if (addressID === null || addressID === undefined) {
                console.log("addressID: " + addressID + " ADRESS DOES NOT EXIST");
                if (order.houseNumber.length <= 5) {
                    console.log("adding Address");
                    const addedAddress = await this.addressService.addAddress(
                        order.street,
                        order.houseNumber,
                        order.zip,
                        zipID
                    );
                    if (!addedAddress) {
                        throw new Error("Address could not be added");
                    }
                    console.log("addedAddress: " + addedAddress);
                    addressID = await this.addressService.getAddressID(order.street, order.houseNumber, zipID);
                    if (addressID === null || addressID === undefined) {
                        throw new Error("AddressID could not be retrieved");
                    }
                    console.log("addressID: " + addressID);
                } else {
                    throw new Error("houseNumber is too long");
                }
            } else {
                console.log("addressID: " + addressID + " ADDRESS EXISTS");
            }

            const response = await this.addingOrder(order, addressID);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addingOrder(order, addressID) {
        try {
            const addedOrder = await this.database.insertOrder(
                order.timestamp,
                order.employeeName,
                order.packageSize,
                order.deliveryDate,
                order.customDropOffPlace,
                order.storeID,
                addressID
            );

            if (!addedOrder) {
                throw new Error("Order could not be added");
            }

            const orderID = this.getOrderID(
                order.timestamp,
                order.employeeName,
                order.packageSize,
                order.deliveryDate,
                order.customDropOffPlace,
                order.storeID,
                addressID
            );

            if (orderID === null || orderID === undefined) {
                throw new Error("OrderID could not be retrieved");
            }

            const addedHandlingInfo = this.addHandlingInfo(orderID, order.handlingInfo);

            if (!addedHandlingInfo) {
                throw new Error("HandlingInfo could not be added");
            }

            const addedRecipient = this.addRecipient(
                orderID,
                order.firstName,
                order.lastName,
                addressID
            );

            if (!addedRecipient) {
                throw new Error("Recipient could not be added");
            }

            return {
                response: "Order successfully added",
                orderID: orderID.orderID,
            };
        } catch (error) {
            throw error;
        }
    }

    async getAllOrdersOfStore(storeID) {
        try {
            if (!storeID) {
                throw new Error("StoreID is null or undefined");
            }

            const orders = await this.database.selectAllOrdersOfStore(storeID);

            if (orders) {
                return orders;
            } else {
                throw new Error("No orders found");
            }
        } catch (error) {
            throw error;
        }
    }

    async addHandlingInfo(orderID, handlingInfo) {
        try {
            if (!orderID || !handlingInfo) {
                throw new Error("OrderID or handlingInfo is null or undefined");
            }

            const addedHandlingInfo = await this.database.insertHandlingInfo(orderID, handlingInfo);

            if (addedHandlingInfo) {
                return "HandlingInfo successfully added";
            } else {
                throw new Error("HandlingInfo could not be added");
            }
        } catch (error) {
            throw error;
        }
    }

    async addRecipient(orderID, firstName, lastName, addressID) {
        try {
            if (!orderID || !firstName || !lastName || !addressID) {
                throw new Error("OrderID, firstName, lastName, or addressID is null or undefined");
            }

            const addedRecipient = await this.database.insertRecipient(orderID, firstName, lastName, addressID);

            if (addedRecipient) {
                return "Recipient successfully added";
            } else {
                throw new Error("Recipient could not be added");
            }
        } catch (error) {
            throw error;
        }
    }

    async getOrderID(
        timestamp,
        employeeName,
        packageSize,
        deliveryDate,
        customDropOffPlace,
        storeID,
        addressID
    ) {
        try {
            if (
                timestamp &&
                employeeName &&
                packageSize &&
                deliveryDate &&
                customDropOffPlace &&
                storeID &&
                addressID
            ) {
                const orderID = await this.database.selectOrderID(
                    timestamp,
                    employeeName,
                    packageSize,
                    deliveryDate,
                    customDropOffPlace,
                    storeID,
                    addressID
                );

                if (orderID !== null && orderID !== undefined) {
                    return orderID;
                } else {
                    throw new Error("OrderID could not be retrieved");
                }
            } else {
                throw new Error("Order or storeID is null or undefined");
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;
