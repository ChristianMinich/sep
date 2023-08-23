const logger = require("../utils/logger");
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
                logger.error("Order or storeID is null or undefined");
                return {
                    response: "Order or storeID is null or undefined",
                };
            }

            const zipID = await this.addressService.getZipID(order.zip);
            if (zipID === null || zipID === undefined) {
                logger.error("zipID: " + zipID + " ZIP DOES NOT EXIST");
                return {
                    response: "ZIP DOES NOT EXIST",
                };
            }

            console.log("gotZipID: " + zipID);

            let addressID = await this.addressService.getAddressID(order.street, order.houseNumber, zipID);
            if (addressID === null || addressID === undefined) {
                console.log("addressID: " + addressID + " ADRESS DOES NOT EXIST");
                if (order.houseNumber.length <= 5) {
                    console.log("adding Address");
                    const addedAddress = await this.addressService.newAddAddress(
                        order.street,
                        order.houseNumber,
                        order.zip,
                        zipID,
                        true
                    );
                    if (!addedAddress) {
                        logger.error("Address could not be added");
                        return {
                            response: "Address could not be added",
                        };
                    }
                    console.log("addedAddress: " + addedAddress);
                    addressID = await this.addressService.getAddressID(order.street, order.houseNumber, zipID);
                    if (addressID === null || addressID === undefined) {
                        logger.error("AddressID could not be retrieved");
                        return {
                            response: "AddressID could not be retrieved",
                        };
                    }
                    console.log("addressID: " + addressID);
                } else {
                    logger.error("HouseNumber is too long");
                    return {
                        response: "HouseNumber is too long",
                    };
                }
                const response = await this.addingOrder(order, addressID);
                return response;
            } else {
                console.log("addressID: " + addressID + " ADDRESS EXISTS");
            }

            const response = await this.addingOrder(order, addressID);
            return response;
        } catch (error) {
            logger.error(error);
            return {
                response: "Error adding order",
            };
        }
    }

    async addingOrder(order, addressID) {
        //logger.info("customDropOffPlace: " + order.customDropOffPlace);
        try {
            const addedOrder = await this.database.insertOrder(
                order.timestamp,
                order.employeeName,
                order.packageSize,
                order.deliveryDate,
                order.customDropOffPlace ? order.customDropOffPlace : " ",
                order.storeID,
                addressID
            );
    
            if (!addedOrder) {
                logger.error("Order could not be added");
                return {
                    response: "Order could not be added",
                };
            }
    
            const orderID = await this.getOrderID(
                order.timestamp,
                order.employeeName,
                order.packageSize,
                order.deliveryDate,
                order.customDropOffPlace ? order.customDropOffPlace : " ",
                order.storeID,
                addressID
            );
    
            if (orderID === null || orderID === undefined) {
                logger.error("OrderID could not be retrieved");
                return {
                    response: "OrderID could not be retrieved",
                };
            }
    
            const addedHandlingInfo = this.addHandlingInfo(orderID.orderID, order.handlingInfo);
    
            if (!addedHandlingInfo) {
                // TODO: delete order
                logger.error("HandlingInfo could not be added");
                return {
                    response: "HandlingInfo could not be added",
                };
            }
    
            const addedRecipient = this.addRecipient(
                orderID.orderID,
                order.firstName,
                order.lastName,
                addressID
            );
    
            if (!addedRecipient) {
                //TODO: delete order and handlingInfo
                logger.error("Recipient could not be added");
                return {
                    response: "Recipient could not be added",
                };
            }
    
            return {
                response: "Order successfully added",
                orderID: orderID.orderID,
            };
        } catch (error) {
            logger.error(error);
            return {
                response: "Error adding order",
            };
        }
    }
    

    async getAllOrdersOfStore(storeID) {
        try {
            if (!storeID) {
                logger.error("StoreID is null or undefined");
                return {
                    response: "StoreID is null or undefined",
                };
            }

            const orders = await this.database.selectAllOrdersOfStore(storeID);

            if (orders) {
                return orders;
            } else {
                logger.error("Orders could not be retrieved");
                return {
                    response: "Orders could not be retrieved",
                };
            }
        } catch (error) {
            logger.error(error);
            return {
                response: "Error retrieving orders",
            };
        }
    }

    async addHandlingInfo(orderID, handlingInfo) {
        try {
            if (!orderID || !handlingInfo) {
                logger.error("OrderID or handlingInfo is null or undefined");
                return false;
            }

            const addedHandlingInfo = await this.database.insertHandlingInfo(orderID, handlingInfo);

            if (addedHandlingInfo) {
                return true;
            } else {
                logger.error("HandlingInfo could not be added");
                return false;
            }
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    async addRecipient(orderID, firstName, lastName, addressID) {
        try {
            if (!orderID || !firstName || !lastName || !addressID) {
                logger.error("OrderID, firstName, lastName or addressID is null or undefined");
                return false;
            }

            const addedRecipient = await this.database.insertRecipient(orderID, firstName, lastName, addressID);

            if (addedRecipient) {
                return true;
            } else {
                logger.error("Recipient could not be added");
                return false;
            }
        } catch (error) {
            logger.error(error);
            return false;
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
                    logger.error("OrderID could not be retrieved");
                    return null;
                }
            } else {
                logger.error("OrderID could not be retrieved");
                return null;
            }
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}

module.exports = OrderService;
