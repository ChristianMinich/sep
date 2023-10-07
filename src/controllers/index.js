const AdminController = require("./adminController");
const ApiController = require("./apiController");
const AuthController = require("./authController");

/**
 * Represents a set of controller objects.
 * @typedef {Object} ControllerSet
 * @property {AdminController} AdminController - The admin controller object.
 * @property {ApiController} ApiController - The API controller object.
 * @property {AuthController} AuthController - The authentication controller object.
 */
const apiController = new ApiController();
const authController = new AuthController();

/**
 * The set of controller objects.
 * @type {ControllerSet}
 */
module.exports = {
  AdminController: AdminController,
  ApiController: apiController,
  AuthController: authController,
};
