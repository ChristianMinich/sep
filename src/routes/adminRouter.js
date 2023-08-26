const AbstractRouter = require("./abstractRouter");
const express = require("express");
const controller = require("../controllers");


/**
 * Class for the admin router.
 * @date 8/14/2023 - 3:22:46 PM
 *
 * @class AdminRouter
 * @typedef {AdminRouter}
 */
class AdminRouter extends AbstractRouter{
    constructor(){
        super();
    }

    initializeRoutes(){
        this.router.get("/", controller.AdminController.index);
        this.router.get("/createStore", controller.AdminController.createStore);
        this.router.get("/storeDetails", controller.AdminController.storeDetails);
        this.router.get("/allOrders", controller.AdminController.allOrders);
        this.router.get("/placeOrder", controller.AdminController.placeOrder);
        this.router.get("/login", controller.AdminController.login);
        this.router.get("/getSettings", controller.AdminController.getSettings);
        this.router.get("/setSettings", controller.AdminController.setSettings);
        this.router.get("/setAddress", controller.AdminController.setAddress);
        this.router.get("/tokenData", controller.AdminController.tokenData);
    }
}

module.exports = new AdminRouter().router;