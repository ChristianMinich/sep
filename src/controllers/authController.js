const Store = require("../models/store");
const services = require("../services");
const logger = require("../utils/logger");
const Address = require("../models/address");
/**
 * Controller for the authentication endpoints.
 * @date 8/12/2023 - 11:05:33 PM
 *
 * @class AuthController
 * @typedef {AuthController}
 */
class AuthController {
  /**
   * Creates an instance of AuthController.
   * @date 9/21/2023 - 2:26:30 PM
   *
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Handles user login by validating the provided username and password, generating an access token on success.
   *
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username) {
        logger.warn("Username not set");
        return res.status(400).json({ message: "Username not set" });
      } else if (!password) {
        logger.warn("Password not set");
        return res.status(400).json({ message: "Password not set" });
      }

      const isValidPassword = await services.userService.validatePassword(
        username,
        password
      );

      if (isValidPassword) {
        try {
          const token = await services.userService.generateJWT(username);

          if (token) {
            logger.info(`Token generated for user ${username}`);
            res.cookie("accessToken", token, { httpOnly: false });
            return res.status(200).json({ token });
          } else {
            logger.warn(`Error generating token for user ${username}`);
            return res.status(500).json({ message: "Error generating token" });
          }
        } catch (error) {
          logger.error(error);
          return res.status(500).json({ message: "Error generating token" });
        }
      } else {
        logger.warn(`Invalid password for user ${username}`);
        return res.status(403).json({ message: "Invalid password" });
      }
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred during login" });
    }
  }

  /**
   * Handles the registration process for a new store, creating a store object and saving it to the database.
   *
   * @param {object} req - The Express.js request object containing registration data.
   * @param {object} res - The Express.js response object.
   */
  async register(req, res) {
    try {
      const newStore = new Store(
        req.body.storeName,
        req.body.username,
        req.body.password,
        req.body.owner,
        new Address(req.body.street, req.body.houseNumber, req.body.zip),
        req.body.telephone,
        req.body.email,
        req.body.logo,
        req.body.backgroundImage
      );

      try {
        const response = await newStore.createStore();

        console.log(response);

        if (response === "Store added") {
          logger.info("Store added");
          res.status(200).send("Store added");
        } else {
          logger.error("Error creating store! " + response);
          res.status(403).send(response);
        }
      } catch (error) {
        logger.error(error);
        res.status(500).send("Error creating store!");
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send("An error occurred during registration");
    }
  }

  /**
   * Updates the password for a user based on the provided request and response objects.
   *
   * @param {object} req - The Express.js request object containing old and new passwords.
   * @param {object} res - The Express.js response object.
   */
  async updatePassword(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      logger.info("No token provided");
      res.status(403).send("No token provided");
    }

    try {
      const decoded = services.userService.getData(token);
      console.log(decoded);
      try {
        services.userService
          .updatePassword(
            decoded.username,
            req.body.oldPassword,
            req.body.newPassword
          )
          .then((result) => {
            if (result) {
              logger.info("Password updated for " + decoded.username);
              res.status(200).send("Password updated");
            } else {
              logger.error("Error updating password");
              res.status(403).send("Error updating password");
            }
          })
          .catch((error) => {
            logger.error(error);
            res.status(403).send("Wrong password");
          });
      } catch (error) {
        logger.error(error);
        res.status(403).send("Invalid password object");
      }
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid token");
    }
  }

  /**
   * Verifies and decodes a JWT token provided in the request headers and sends the decoded payload in the response.
   *
   * @param {object} req - The Express.js request object containing the JWT token.
   * @param {object} res - The Express.js response object.
   */
  async testToken(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      logger.info("No token provided");
      res.status(403).send("No token provided");
    }

    logger.info(token);

    try {
      const decoded = services.userService.getData(
        token.replace("Bearer ", "")
      );
      logger.info("token: " + decoded);
      res.status(200).send(decoded);
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid token");
    }
  }

  /**
   * Decodes and retrieves data from a JWT token provided in the request body and sends the decoded payload in the response.
   *
   * @param {object} req - The Express.js request object containing the JWT token in the request body.
   * @param {object} res - The Express.js response object.
   */
  async tokenData(req, res) {
    try {
      const decoded = services.userService.getData(req.body.token);
      logger.info("token: " + decoded);
      logger.info("token: " + decoded.storeName);
      logger.info("token: " + decoded.owner);
      logger.info("token: " + decoded.logo);
      logger.info("token: " + decoded.telephone);
      logger.info("token: " + decoded.email);
      logger.info("token: " + decoded.username);
      res.status(200).send(decoded);
    } catch (error) {
      logger.error(error);
      res.status(403).send("Invalid token");
    }
  }
}

module.exports = AuthController;
