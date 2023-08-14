const AbstractController = require("./abstractController");
const bcrypt = require("bcrypt");
const store = require("../models/store");
/**
 * Controller for the authentication endpoints.
 * @date 8/12/2023 - 11:05:33 PM
 *
 * @class AuthController
 * @typedef {AuthController}
 */
class AuthController extends AbstractController{
  constructor(service) {
    super(service);
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
      console.log("service" + this.service);
  
      if (!username) {
        return res.status(400).json({ message: "Username not set" });
      } else if (!password) {
        return res.status(400).json({ message: "Password not set" });
      }
  
      const isValidPassword = await this.userSvc.validatePassword(username, password);
  
      if (isValidPassword) {
        try {
          const token = await this.userSvc.generateJWT(username);
  
          if (token) {
            res.cookie("accessToken", token, { httpOnly: false });
            return res.status(200).json({ token });
          } else {
            return res.status(500).json({ message: "Error generating token" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Error generating token" });
        }
      } else {
        return res.status(403).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred during login" });
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
        });
  
        req.body.password = hashedPassword;
  
        //!svc.doesStoreExist(req.body.STORE_NAME)
        console.log("Creating store...");
  
        const newStore = new store(
          req.body.storeName,
          req.body.username,
          req.body.password,
          req.body.owner,
          req.body.street,
          req.body.houseNumber,
          req.body.zip,
          req.body.telephone,
          req.body.email,
          req.body.logo,
          req.body.backgroundImage
        );
  
        console.log(newStore);
  
        if (newStore.validateStore(newStore)) {
          try {
            const response = await newStore.createStore();
  
            console.log(response);
  
            if (response === "Store added") {
              res.status(200).send("Store added");
            } else {
              res.status(403).send(response);
            }
          } catch (err) {
            console.log(err);
            res.status(500).send("Error creating store!");
          }
        } else {
          res.status(403).send("Invalid store!");
        }
      } else {
        res.status(403).send("Store already exists!");
      }
      /*} else {
        res.status(403).send("Invalid register code!");
      }*/
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred during registration");
    }
  }
  
}

module.exports = AuthController;
