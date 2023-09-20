const express = require("express");

/**
 * Abstract class for defining routers.
 * @class AbstractRouter
 * @typedef {AbstractRouter}
 * @date 8/14/2023 - 3:21:53 PM
 */
class AbstractRouter {
  /**
   * Creates an instance of AbstractRouter.
   */
  constructor() {
    /**
     * Express router instance.
     * @type {express.Router}
     */
    this.router = new express.Router();

    // Initialize routes for the router.
    this.initializeRoutes();
  }

  /**
   * Initialize routes for the router. Must be implemented by subclasses.
   * @abstract
   * @throws {Error} When not implemented by a subclass.
   * @memberof AbstractRouter
   */
  initializeRoutes() {
    throw new Error("Not implemented");
  }
}

module.exports = AbstractRouter;
