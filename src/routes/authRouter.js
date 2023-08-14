const AbstractRouter = require("./abstractRouter");
const express = require("express");
const controller = require("../controllers");

class AuthRouter extends AbstractRouter{
    constructor(){
        super();
    }

    initializeRoutes(){
        this.router.post("/login", controller.AuthController.login);
        this.router.post("/register", controller.AuthController.register);
    }
}

module.exports = new AuthRouter().router;