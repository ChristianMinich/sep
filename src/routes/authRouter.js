const AbstractRouter = require("./abstractRouter");
const controller = require("../controllers");

/**
 * Router for handling authentication-related routes.
 * @class AuthRouter
 * @extends AbstractRouter
 */
class AuthRouter extends AbstractRouter {
  /**
   * Creates an instance of AuthRouter.
   */
  constructor() {
    super();
  }

  /**
   * Initializes routes for authentication.
   */
  initializeRoutes() {
    /**
     * Route for user login.
     * @name POST /auth/login
     * @function
     */
    this.router.post("/login", controller.AuthController.login);

    /**
     * Route for user registration.
     * @name POST /auth/register
     * @function
     */
    this.router.post("/register", controller.AuthController.register);

    /**
     * Route for updating user password.
     * @name POST /auth/updatePassword
     * @function
     */
    this.router.post(
      "/updatePassword",
      controller.AuthController.updatePassword
    );

    /**
     * Route for testing user token.
     * @name GET /auth/testToken
     * @function
     */
    this.router.get("/testToken", controller.AuthController.testToken);

    /**
     * Route for retrieving token data.
     * @name POST /auth/tokenData
     * @function
     */
    this.router.post("/tokenData", controller.AuthController.tokenData);
  }
}

/**
 * The router instance for authentication routes.
 * @type {express.Router}
 */
module.exports = new AuthRouter().router;
