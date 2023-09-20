const AbstractController = require("./abstractController");
const path = require("path");

/**
 * Controller for admin routes.
 * @class
 * @typedef {AdminController}
 * @date 8/12/2023 - 11:04:36 PM
 */
class AdminController extends AbstractController {
  /**
   * Creates an instance of AdminController.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Sends the index HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  index(req, res) {
    res.status(200).sendFile(path.resolve("public/index.html"));
  }

  /**
   * Sends the createStore HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  createStore(req, res) {
    res.status(200).sendFile(path.resolve("public/createStore.html"));
  }

  /**
   * Sends the storeDetails HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  storeDetails(req, res) {
    res.status(200).sendFile(path.resolve("public/storeDetails.html"));
  }

  /**
   * Sends the allOrders HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  allOrders(req, res) {
    res.status(200).sendFile(path.resolve("public/allOrders.html"));
  }

  /**
   * Sends the placeOrder HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  placeOrder(req, res) {
    res.status(200).sendFile(path.resolve("public/placeOrder.html"));
  }

  /**
   * Sends the login HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  login(req, res) {
    res.status(200).sendFile(path.resolve("public/login.html"));
  }

  /**
   * Sends the getSettings HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  getSettings(req, res) {
    res.status(200).sendFile(path.resolve("public/getSettings.html"));
  }

  /**
   * Sends the setSettings HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  setSettings(req, res) {
    res.status(200).sendFile(path.resolve("public/setSettings.html"));
  }

  /**
   * Sends the setAddress HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  setAddress(req, res) {
    res.status(200).sendFile(path.resolve("public/setAddress.html"));
  }

  /**
   * Sends the tokenData HTML file as a response.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  tokenData(req, res) {
    res.status(200).sendFile(path.resolve("public/tokenData.html"));
  }
}

module.exports = new AdminController();
