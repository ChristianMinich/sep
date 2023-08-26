const AbstractRouter = require("./abstractRouter");
const express = require("express");
const controller = require("../controllers");

class ApiRouter extends AbstractRouter{
    constructor(){
        super();
    }

    initializeRoutes(){
        this.router.post("/order", controller.ApiController.order);
        this.router.get("/allOrders", controller.ApiController.allOrders);
        this.router.get("/settings", controller.ApiController.getSettings);
        this.router.post("/settings", controller.ApiController.setSettings);
        this.router.post("/setAddress", controller.ApiController.setAddress);
        this.router.get("/store-details", controller.ApiController.storeDetails);
    }

}

module.exports = new ApiRouter().router;