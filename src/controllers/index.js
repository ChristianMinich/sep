const svc = require("../services");

const AdminController = require("./adminController");
const ApiController = require("./apiController");
const AuthController = require("./authController");

console.log(svc);

const apiController = new ApiController(svc.orderService, svc.storeService, svc.userService);
const authController = new AuthController(svc.storeService, svc.userService);

module.exports = {
    AdminController: AdminController,
    ApiController: apiController,
    AuthController: authController
};
