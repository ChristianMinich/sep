const AbstractRouter = require("./abstractRouter");
const controller = require("../controllers");

/**
 * Router for handling API-related routes.
 * @class ApiRouter
 * @extends AbstractRouter
 */
class ApiRouter extends AbstractRouter {
  /**
   * Creates an instance of ApiRouter.
   */
  constructor() {
    super();
  }

  /**
   * Initializes routes for API endpoints.
   */
  initializeRoutes() {
    /**
     * Route for creating an order.
     * @name POST /api/order
     * @function
     */
    this.router.post("/order", controller.ApiController.order);

    /**
     * Route for retrieving all orders.
     * @name GET /api/allOrders
     * @function
     */
    this.router.get("/allOrders", controller.ApiController.allOrders);

    /**
     * Route for getting settings.
     * @name GET /api/settings
     * @function
     */
    this.router.get("/settings", controller.ApiController.getSettings);

    /**
     * Route for updating settings.
     * @name POST /api/settings
     * @function
     */
    this.router.post("/settings", controller.ApiController.setSettings);

    /**
     * Route for setting an address.
     * @name POST /api/setAddress
     * @function
     */
    this.router.post("/setAddress", controller.ApiController.setAddress);

    /**
     * Route for retrieving store details.
     * @name GET /api/store-details
     * @function
     */
    this.router.get("/store-details", controller.ApiController.storeDetails);
  }
}

/**
 * The router instance for API routes.
 * @type {express.Router}
 */
module.exports = new ApiRouter().router;
