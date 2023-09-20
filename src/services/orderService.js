const logger = require("../utils/logger");
const EmailSender = require("./mailService");
const emailSender = new EmailSender();
const allOrdersObject = require("../utils/allOrdersObject");
/**
 * Service for managing order-related operations.
 */
class OrderService {
  /**
   * Creates an instance of OrderService.
   *
   * @param {object} database - The database instance.
   * @param {object} addressService - An instance of the AddressService.
   */
  constructor(database, addressService) {
    this.database = database;
    this.addressService = addressService;
  }

  /**
   * Adds a new order to the database.
   *
   * @param {object} order - The order data.
   * @return {Promise<object>} A Promise that resolves to an object with a response and orderID.
   */
  async addOrder(order) {
    logger.info("order " + order);
    logger.info("order._recipient " + order._recipient);
    logger.info("order._recipient._address " + order._recipient._address);
    logger.info(
      "order._recipient._address._zip " + order._recipient._address._zip,
    );
    logger.info(
      "order._recipient._address._street " + order._recipient._address._street,
    );
    logger.info(
      "order._recipient._address._houseNumber " +
        order._recipient._address._houseNumber,
    );
    logger.info("order._timestamp " + order._timestamp);
    logger.info("order._packageSize " + order._packageSize);
    logger.info("order._deliveryDate " + order._deliveryDate);
    logger.info("order._storeID " + order._storeID);
    logger.info("order._recipient._firstName " + order._recipient._firstName);
    logger.info("order._recipient._lastName " + order._recipient._lastName);
    logger.info("order._email " + order._email);
    try {
      if (
        !order ||
        !order._recipient._address._zip ||
        !order._recipient._address._street ||
        !order._recipient._address._houseNumber ||
        !order._timestamp ||
        !order._packageSize ||
        !order._deliveryDate ||
        !order._storeID ||
        !order._recipient._firstName ||
        !order._recipient._lastName
      ) {
        logger.error("Order or storeID is null or undefined");
        return {
          response: "Order or storeID is null or undefined",
        };
      }

      const zipID = await this.addressService.getZipID(
        order._recipient._address._zip,
      );
      if (zipID === null || zipID === undefined) {
        logger.error("zipID: " + zipID + " ZIP DOES NOT EXIST");
        return {
          response: "ZIP DOES NOT EXIST",
        };
      }

      console.log("gotZipID: " + zipID);

      let addressID = await this.addressService.getAddressID(
        order._recipient._address._street,
        order._recipient._address._houseNumber,
        zipID,
      );
      if (addressID === null || addressID === undefined) {
        console.log("addressID: " + addressID + " ADRESS DOES NOT EXIST");
        if (order._recipient._address._houseNumber.length <= 5) {
          console.log("adding Address");
          const addedAddress = await this.addressService.addAddress(
            order._recipient._address._street,
            order._recipient._address._houseNumber,
            order._recipient._address._zip,
            zipID,
            true,
          );
          if (!addedAddress) {
            logger.error("Address could not be added");
            return {
              response: "Address could not be added",
            };
          }
          console.log("addedAddress: " + addedAddress);
          addressID = await this.addressService.getAddressID(
            order._recipient._address._street,
            order._recipient._address._houseNumber,
            zipID,
          );
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

  /**
   * Adds an order to the system asynchronously.
   *
   * @param {Object} order - The order object to be added.
   * @param {number} addressID - The ID of the address associated with the order.
   * @return {Object} - An object with a response indicating the result of the operation.
   */
  async addingOrder(order, addressID) {
    try {
      const addedOrder = await this.database.insertOrder(
        order._timestamp,
        order._employeeName ? order._employeeName : " ",
        order._packageSize,
        order._deliveryDate,
        order._customDropOffPlace ? order._customDropOffPlace : " ",
        order._storeID,
        addressID,
      );

      if (!addedOrder) {
        logger.error("<-- Order process failed! -->");
        logger.error("Order could not be added");
        return {
          response: "Order could not be added",
        };
      }

      const orderID = await this.getOrderID(
        order._timestamp,
        order._employeeName ? order._employeeName : " ",
        order._packageSize,
        order._deliveryDate,
        order._customDropOffPlace ? order._customDropOffPlace : " ",
        order._storeID,
        addressID,
      );

      if (orderID === null || orderID === undefined) {
        logger.error("OrderID could not be retrieved");
        return {
          response: "OrderID could not be retrieved",
        };
      }

      const addedHandlingInfo = this.addHandlingInfo(
        orderID.orderID,
        order._handlingInfo ? order._handlingInfo : " ",
      );

      if (!addedHandlingInfo) {
        try {
          logger.error("<-- Order process failed! -->");
          // TODO: delete order
          const removedOrder = await this.removeOrder(orderID.orderID);
          if (removedOrder) {
            logger.info("Order removed");
            return {
              response: "Order process failed!",
            };
          } else {
            logger.error("Order could not be removed");
            return {
              response: "Order could not be removed",
            };
          }
        } catch (error) {}
        logger.error("HandlingInfo could not be added");
        return {
          response: "HandlingInfo could not be added",
        };
      }

      const addedRecipient = this.addRecipient(
        orderID.orderID,
        order._recipient._firstName,
        order._recipient._lastName,
        addressID,
      );

      if (!addedRecipient) {
        logger.error("<-- Order process failed! -->");
        logger.error("Recipient could not be added");
        try {
          const removedOrder = await this.removeOrder(orderID.orderID);
          if (removedOrder) {
            logger.info("Order removed");
            try {
              const removedHandlingInfo = await this.removeHandlingInfo(
                orderID.orderID,
              );
              if (removedHandlingInfo) {
                logger.info("HandlingInfo removed");
                return {
                  response: "Order process failed!",
                };
              } else {
                logger.error("HandlingInfo could not be removed");
                return {
                  response: "HandlingInfo could not be removed",
                };
              }
            } catch (error) {
              logger.error(error);
              return {
                response: "Error removing handlingInfo",
              };
            }
          } else {
            logger.error("Order could not be removed");
            return {
              response: "Order could not be removed",
            };
          }
        } catch (error) {
          logger.error(error);
          return {
            response: "Error removing order",
          };
        }
      }

      const orderEmail = {
        storeID: order._storeID,
        orderID: orderID.orderID,
        timestamp: order._timestamp,
        employeeName: order._employeeName ? order._employeeName : " ",
        firstName: order._recipient._firstName,
        lastName: order._recipient._lastName,
        street: order._recipient._address._street,
        houseNumber: order._recipient._address._houseNumber,
        zip: order._recipient._address._zip,
        packageSize: order._packageSize,
        deliveryDate: order._deliveryDate,
        customDropOffPlace: order._customDropOffPlace
          ? order._customDropOffPlace
          : " ",
        handlingInfo: order._handlingInfo ? order._handlingInfo : " ",
      };

      try {
        emailSender.sendOrderEmail(orderEmail, order._email);

        return {
          response: "Order successfully added",
          orderID: orderID.orderID,
        };
      } catch (error) {
        return {
          response: "Error sending email",
        };
      }
    } catch (error) {
      logger.error(error);
      return {
        response: "Error adding order",
      };
    }
  }

  /**
   * Retrieves all orders of a store from the database.
   *
   * @param {number} storeID - The ID of the store.
   * @return {Promise<object[]>} A Promise that resolves to an array of order objects.
   */
  async getAllOrdersOfStore(storeID) {
    try {
      if (!storeID) {
        logger.error("StoreID is null or undefined");
        return {
          response: "StoreID is null or undefined",
        };
      }

      const orders = await this.database.selectAllOrdersOfStore(storeID);

      if (orders !== null && orders !== undefined) {
        const reply = orders.map((order) => {
          return allOrdersObject.createObject(order);
        });
        logger.info("Orders have been retrieved");
        logger.info(reply);
        return reply;
      } else {
        logger.info("No orders have been placed yet");
        return {
          response: "No orders have been placed yet",
        };
      }
    } catch (error) {
      logger.error(error);
      return {
        response: "Error retrieving orders",
      };
    }
  }

  /**
   * Adds handling information to an order in the database.
   *
   * @param {number} orderID - The ID of the order.
   * @param {string} handlingInfo - The handling information to add.
   * @return {Promise<boolean>} A Promise that resolves to true if the handling info was added successfully, or false otherwise.
   */
  async addHandlingInfo(orderID, handlingInfo) {
    try {
      if (!orderID || !handlingInfo) {
        logger.error("OrderID or handlingInfo is null or undefined");
        return false;
      }

      const addedHandlingInfo = await this.database.insertHandlingInfo(
        orderID,
        handlingInfo,
      );

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

  /**
   * Adds a recipient to an order in the database.
   *
   * @param {number} orderID - The ID of the order.
   * @param {string} firstName - The recipient's first name.
   * @param {string} lastName - The recipient's last name.
   * @param {number} addressID - The ID of the recipient's address.
   * @return {Promise<boolean>} A Promise that resolves to true if the recipient was added successfully, or false otherwise.
   */
  async addRecipient(orderID, firstName, lastName, addressID) {
    try {
      if (!orderID || !firstName || !lastName || !addressID) {
        logger.error(
          "OrderID, firstName, lastName or addressID is null or undefined",
        );
        return false;
      }

      const addedRecipient = await this.database.insertRecipient(
        orderID,
        firstName,
        lastName,
        addressID,
      );

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

  /**
   * Removes an order from the database.
   *
   * @param {number} orderID - The ID of the order to remove.
   * @return {Promise<boolean>} A Promise that resolves to true if the order was removed successfully, or false otherwise.
   */
  async removeOrder(orderID) {
    try {
      if (!orderID) {
        logger.error("OrderID is null or undefined");
        return false;
      }
      const removedOrder = await this.database.deleteOrder(orderID);

      if (removedOrder) {
        logger.info("removedOrder: " + removedOrder);
        return true;
      } else {
        logger.error("removedOrder could not be removed");
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Removes handling information from an order in the database.
   *
   * @param {number} orderID - The ID of the order.
   * @return {Promise<boolean>} A Promise that resolves to true if the handling information was removed successfully, or false otherwise.
   */
  async removeHandlingInfo(orderID) {
    try {
      if (!orderID) {
        logger.error("OrderID is null or undefined");
        return false;
      }
      const removedHandlingInfo =
        await this.database.deleteHandlingInfo(orderID);

      if (removedHandlingInfo) {
        logger.info("removedHandlingInfo: " + removedHandlingInfo);
        return true;
      } else {
        logger.error("HandlingInfo could not be removed");
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Retrieves the ID of an order based on various order details.
   *
   * @param {string} timestamp - The order timestamp.
   * @param {string} employeeName - The employee name associated with the order.
   * @param {string} packageSize - The package size of the order.
   * @param {string} deliveryDate - The delivery date of the order.
   * @param {string} customDropOffPlace - The custom drop-off place for the order.
   * @param {number} storeID - The ID of the store associated with the order.
   * @param {number} addressID - The ID of the order's address.
   * @return {Promise<object|null>} A Promise that resolves to the order ID if found, or null if not found.
   */
  async getOrderID(
    timestamp,
    employeeName,
    packageSize,
    deliveryDate,
    customDropOffPlace,
    storeID,
    addressID,
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
          addressID,
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
