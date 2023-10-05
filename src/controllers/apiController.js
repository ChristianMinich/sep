const services = require("../services");
const Order = require("../models/order");
const Settings = require("../models/settings");
const Recipient = require("../models/recipient");
const Address = require("../models/address");
const logger = require("../utils/logger");
/**
 * Controller for the API routes.
 * @date 8/12/2023 - 11:05:08 PM
 *
 * @class ApiController
 * @typedef {ApiController}
 */
class ApiController {
  /**
   * Creates an instance of ApiController.
   * @constructor
   */
  constructor() {
    /** Constructor */
  }

  /**
   * Handles the order creation and placement based on the provided request and response objects.
   *
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   */
  order(req, res) {
    const decoded = req.decoded;
    logger.info(req.body);
    if (!decoded) {
      logger.warn("No decoded token!");
      res.status(403).send("No decoded token!");
    }
    try {
      const orderObject = new Order(
        decoded.storeID,
        req.body.timestamp,
        req.body.employeeName,
        new Recipient(
          req.body.recipient.firstName,
          req.body.recipient.lastName,
          new Address(
            req.body.recipient.address.street,
            req.body.recipient.address.houseNumber,
            req.body.recipient.address.zip
          )
        ),
        req.body.packageSize,
        req.body.handlingInfo,
        req.body.deliveryDate,
        req.body.customDropOffPlace,
        decoded.email
      );
      orderObject
        .placeOrder(decoded.storeName)
        .then((result) => {
          logger.info(
            "Order has been placed with the orderID: " + result.orderID
          );
          logger.info(result.response);
          res.status(200).send(result);
        })
        .catch((error) => {
          logger.error(error);
          res.status(403).send(error);
        });
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid order object");
    }
    
  }

  /**
   * Retrieves all orders for a store based on the provided request and response objects.
   *
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   */
  allOrders(req, res) {
    const decoded = req.decoded;
    if (!decoded) {
      logger.warn("No decoded token!");
      res.status(403).send("No decoded token!");
    }
    services.orderService
      .getAllOrdersOfStore(decoded.storeID)
      .then((result) => {
        logger.info("retrieved all orders of store " + decoded.storeID);
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(error);
        res.status(403).send(error);
      });
  }

  /**
   * Retrieves the settings for a store based on the provided request and response objects.
   *
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   */
  getSettings(req, res) {
    const decoded = req.decoded;

    if (!decoded) {
      logger.warn("No decoded token!");
      res.status(403).send("No decoded token!");
    }
    services.storeService
      .getSettings(decoded.storeID)
      .then((result) => {
        logger.info("retrieved settings of store " + decoded.storeID);
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(error);
        res.status(403).send(error);
      });
  }

  /**
   * Set settings for a user.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  setSettings(req, res) {
    const decoded = req.decoded;
    if (!decoded) {
      logger.warn("No decoded token!");
      res.status(403).send("No decoded token!");
    }
    try {
      const settingsObject = new Settings(
        decoded.storeID,
        req.body.parameter,
        req.body.value
      );
      try {
        settingsObject
          .updateParameter()
          .then(async (result) => {
            if (result) {
              try {
                const token = await services.userService.generateJWT(
                  decoded.username
                );
                if (token) {
                  logger.info(`Token generated for user ${decoded.username}`);
                  res.cookie("accessToken", token, { httpOnly: false });
                  logger.info("Settings updated for " + decoded.storeID);
                  logger.info("Token: " + token);
                  return res.status(200).json({ token });
                } else {
                  logger.warn(`Error generating token for user ${username}`);
                  return res
                    .status(500)
                    .json({ message: "Error generating token" });
                }
              } catch (error) {
                logger.error(error);
                return res
                  .status(500)
                  .json({ message: "Error generating token" });
              }
            } else {
              logger.error("Error updating settings");
              res.status(403).send("Error updating settings");
            }
          })
          .catch((error) => {
            logger.error(error);
            res.status(403).send(error);
          });
      } catch (error) {
        logger.error(error);
        res.status(403).send(error);
      }
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid settings object");
    }
  }

  /**
   * Updates the settings for a store based on the provided request and response objects.
   *
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   */
  setAddress(req, res) {
    const decoded = req.decoded;

    if (!decoded) {
      logger.warn("No decoded token!");
      res.status(403).send("No decoded token!");
    }
    try {
      const addressObject = new Address(
        req.body.address.street,
        req.body.address.houseNumber,
        req.body.address.zip
      );
      try {
        addressObject
          .updateAddress(decoded.storeID)
          .then((result) => {
            logger.info("result" + result);
            if (result) {
              logger.info("Address updated for " + decoded.storeID);
              res.status(200).send("Address updated");
            } else {
              logger.error("Error updating address");
              res.status(403).send("Error updating address");
            }
          })
          .catch((error) => {
            logger.error(error);
            res.status(403).send(error);
          });
      } catch (error) {
        logger.error(error);
        res.status(403).send(error);
      }
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid address object");
    }
  }
}

module.exports = ApiController;
