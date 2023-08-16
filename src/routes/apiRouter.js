const AbstractRouter = require("./abstractRouter");
const express = require("express");
const controller = require("../controllers");

class ApiRouter extends AbstractRouter{
    constructor(){
        super();
    }

    initializeRoutes(){
        this.router.post("/order", controller.ApiController.order);
        this.router.post("/allOrders", controller.ApiController.allOrders);
        this.router.post("/getSettings", controller.ApiController.getSettings);
        this.router.post("/setSettings", controller.ApiController.setSettings);
        this.router.get("/store-details", controller.ApiController.storeDetails);
    }

}

module.exports = new ApiRouter().router;