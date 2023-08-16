const AdminController = require("./adminController");
const ApiController = require("./apiController");
const AuthController = require("./authController");

const apiController = new ApiController();
const authController = new AuthController();

module.exports = {
    AdminController: AdminController,
    ApiController: apiController,
    AuthController: authController
};
