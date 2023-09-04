const AbstractController = require("./abstractController");
const bcrypt = require("bcrypt");
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
class AuthController extends AbstractController {
  constructor() {
    super();
  }

  /**
   * Login function for the API to authenticate a user and return a JWT token.
   * @date 8/12/2023 - 11:01:03 PM
   *
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {JSON}
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
   * Register function for the API to register a new user.
   * @date 8/12/2023 - 11:02:51 PM
   *
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {*}
   */
  async register(req, res) {
    try {
      //if (svc.validateRegisterCode(req.body.code)) {
      /*
      console.log(req.body);
      if (true) {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              reject("Error hashing password");
            } else {
              resolve(hash);
            }
          });
        }); */

      //req.body.password = hashedPassword;

      //!svc.doesStoreExist(req.body.STORE_NAME)

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
      /*} else {
        res.status(403).send("Invalid register code!");
      }*/
    } catch (error) {
      logger.error(error);
      res.status(500).send("An error occurred during registration");
    }
  }

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
