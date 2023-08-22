const AbstractController = require("./abstractController");
const services = require("../services");
const Order = require("../models/order");
const Settings = require("../models/settings_new");
const Address = require("../models/address");
const logger = require("../utils/logger");
/**
 * Controller for the API routes.
 * @date 8/12/2023 - 11:05:08 PM
 *
 * @class ApiController
 * @typedef {ApiController}
 */
class ApiController extends AbstractController{
    constructor(){
      super();
    }

  order(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      try {
        const orderObject = new Order(
          decoded.storeID,
          req.body.timestamp,
          req.body.employeeName,
          req.body.firstName,
          req.body.lastName,
          req.body.street,
          req.body.houseNumber,
          req.body.zip,
          req.body.packageSize,
          req.body.handlingInfo,
          req.body.deliveryDate,
          req.body.customDropOffPlace
        );
        if (orderObject.validateOrder(orderObject)) {
          orderObject
            .placeOrder()
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((error) => {
              res.status(403).send(error);
            });
        }
      } catch (error) {
        console.log(error);
        res.status(403).send("Invalid order object");
      }
    } catch (error) {
      res.status(403).send("Invalid token");
    }
  }

  allOrders(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      services.orderService
        .getAllOrdersOfStore(decoded.storeID)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((error) => {
          res.status(403).send(error);
        });
    } catch (error) {
      res.status(403).send("Invalid token");
    }
  }

  getSettings(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      services.storeService
        .getSettings(decoded.storeID)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((error) => {
          res.status(403).send(error);
        });
    } catch (error) {
      res.status(403).send("Invalid token");
    }
  }

  setSettings(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      try {
        const settingsObject = new Settings(
          decoded.storeID,
          req.body.parameter,
          req.body.value
        );
        try{
          settingsObject.updateParameter().then((result) => {
            if(result){
              res.status(200).send("Settings updated");
            }else{
              logger.error("Error updating settings");
              res.status(403).send("Error updating settings");
            }
          }).catch((error) => {
            logger.error(error);
            res.status(403).send(error);
          });
        }catch(error){
          logger.error(error);
          res.status(403).send(error);
        }
      } catch (error) {
        logger.error(error);
        res.status(403).send("Invalid settings object");
      }
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid token");
    }
    
  }

  setAddress(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      try {
        const addressObject = new Address(
          decoded.storeID,
          req.body.address.street,
          req.body.address.houseNumber,
          req.body.address.zip
        );
        try {
          addressObject.updateAddress().then((result) => {
            logger.info("result" + result);
            if(result){
              res.status(200).send("Address updated");
            }else{
              logger.error("Error updating address");
              res.status(403).send("Error updating address");
            }
          }).catch((error) => {
            logger.error(error);
          });
        } catch (error) {
          logger.error(error);
        }
      } catch (error) {
        logger.error(error);
        res.status(403).send("Invalid address object");
      }
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid token");
    }
  }

  storeDetails(req, res) {
    try {
      services.storeService
        .storeDetails()
        .then((details) => {
          if (details !== null) {
            res.status(200).send(JSON.stringify(details));
          } else {
            res.status(400).send("No Store-Details Found!");
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Error fetching Store-Details!");
        });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching Store-Details!");
    }
  }
}

module.exports = ApiController;
