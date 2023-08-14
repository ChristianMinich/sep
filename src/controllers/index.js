const service = require("../services");

const AdminController = require("./adminController");
const ApiController = require("./apiController");
const AuthController = require("./authController");

console.log(service);

const apiController = new ApiController(service);
const authController = new AuthController(service);

module.exports = {
    AdminController: AdminController,
    ApiController: apiController,
    AuthController: authController
};
