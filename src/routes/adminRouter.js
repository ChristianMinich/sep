const AbstractRouter = require("./abstractRouter");
const controller = require("../controllers");

/**
 * Class representing the admin router for handling admin-related routes.
 * @class AdminRouter
 * @extends AbstractRouter
 */
class AdminRouter extends AbstractRouter {
  /**
   * Creates an instance of AdminRouter.
   */
  constructor() {
    super();
  }

  /**
   * Initializes routes for admin-related endpoints.
   */
  initializeRoutes() {
    /**
     * Route for the admin dashboard.
     * @name GET /admin/
     * @function
     */
    this.router.get("/", controller.AdminController.index);

    /**
     * Route for creating a store.
     * @name GET /admin/createStore
     * @function
     */
    this.router.get("/createStore", controller.AdminController.createStore);

    /**
     * Route for viewing store details.
     * @name GET /admin/storeDetails
     * @function
     */
    this.router.get("/storeDetails", controller.AdminController.storeDetails);

    /**
     * Route for viewing all orders.
     * @name GET /admin/allOrders
     * @function
     */
    this.router.get("/allOrders", controller.AdminController.allOrders);

    /**
     * Route for placing an order.
     * @name GET /admin/placeOrder
     * @function
     */
    this.router.get("/placeOrder", controller.AdminController.placeOrder);

    /**
     * Route for admin login.
     * @name GET /admin/login
     * @function
     */
    this.router.get("/login", controller.AdminController.login);

    /**
     * Route for getting admin settings.
     * @name GET /admin/getSettings
     * @function
     */
    this.router.get("/getSettings", controller.AdminController.getSettings);

    /**
     * Route for setting admin settings.
     * @name GET /admin/setSettings
     * @function
     */
    this.router.get("/setSettings", controller.AdminController.setSettings);

    /**
     * Route for setting an address.
     * @name GET /admin/setAddress
     * @function
     */
    this.router.get("/setAddress", controller.AdminController.setAddress);

    /**
     * Route for retrieving token data.
     * @name GET /admin/tokenData
     * @function
     */
    this.router.get("/tokenData", controller.AdminController.tokenData);
  }
}

/**
 * The router instance for admin routes.
 * @type {express.Router}
 */
module.exports = new AdminRouter().router;
