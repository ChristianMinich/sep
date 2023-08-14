import AbstractController from "./abstractController.js";
/**
 * Controller for the API routes.
 * @date 8/12/2023 - 11:05:08 PM
 *
 * @class ApiController
 * @typedef {ApiController}
 */
class ApiController extends AbstractController{
    constructor(orderSvc, storeSvc, userService){
        super(orderSvc, storeSvc, userService);
    }

  order(req, res) {
    try {
      const decoded = svc.getData(req.body.token);
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
      const decoded = svc.getData(req.body.token);
      svc.orderSvc
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
      const decoded = svc.getData(req.body.token);
      settingsSVC
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
      const decoded = svc.getData(req.body.token);
      try {
        const settingsObject = new settings(
          decoded.storeID,
          req.body.storeName,
          req.body.password,
          req.body.owner,
          req.body.street,
          req.body.houseNumber,
          req.body.zip,
          req.body.telephone,
          req.body.email,
        );
        try{
        if (true) { //settingsObject.validateStore(settingsObject)
          settingsObject.updateSettings().then((result) => {
            if(result){
              res.status(200).send("Settings updated");
            }else{
              res.status(403).send("Error updating settings");
            }
          }).catch((error) => {
            res.status(403).send(error);
          });
        }
        }catch(error){
          res.status(403).send(error);
        }
      } catch (error) {
        res.status(403).send("Invalid settings object");
      }
    } catch (error) {
      res.status(403).send("Invalid token");
    }
    
  }

  storeDetails(req, res) {
    try {
      svc
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
