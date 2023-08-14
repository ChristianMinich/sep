const express = require("express");

/**
 * Abstract class for defining routers.
 * @date 8/14/2023 - 3:21:53 PM
 *
 * @class AbstractRouter
 * @typedef {AbstractRouter}
 */
class AbstractRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        throw new Error("Not implemented");
    }
}

module.exports = AbstractRouter;