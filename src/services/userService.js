/**
 * Load environment variables from a .env file (if available).
 */
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
/**
 * Service for user-related operations.
 * @class
 * @typedef {UserService}
 * @date 8/12/2023 - 10:51:55 PM
 */
class UserService {
  /**
   * Creates an instance of UserService.
   * @constructor
   * @param {Object} database - The database service for interacting with user data.
   */
  constructor(database) {
    this.database = database;
  }

  /**
   * Validates the password of a user.
   * @async
   * @param {string} username - The username of the user.
   * @param {string} password - The password to validate.
   * @return {boolean} - True if the password is valid, false otherwise.
   */
  async validatePassword(username, password) {
    try {
      console.log(username + " " + password);

      if (!username) {
        return false;
      } else {
        const result = await this.database.getPasswordByName(username);
        logger.info("result: " + result.password);

        if (!result) {
          console.log("no result");
          return false;
        } else {
          if (result !== null && result !== undefined) {
            console.log("tried to compare!");
            const valid = await bcrypt.compare(password, result.password); // remove .password
            console.log(password + " " + result.password + " " + valid);

            if (valid) {
              console.log("valid");
              return true;
            } else {
              return false;
            }
          }
        }
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Adds login credentials (username and hashed password) for a user.
   * @async
   * @param {string} username - The username of the user.
   * @param {string} password - The password to hash and add.
   * @return {boolean} - True if the credentials were successfully added, false otherwise.
   */
  async addLoginCredentials(username, password) {
    logger.info(password);
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.error(err);
          reject(new Error("Error hashing password"));
        } else {
          console.log("hash: " + hash);
          try {
            const result = await this.database.insertLoginCredentials(
              username,
              hash,
            );
            console.log(result);
            resolve(result === true);
          } catch (error) {
            console.error(error);
            reject(new Error("Error adding login credentials"));
          }
        }
      });
    });
  }

  /**
   * Updates login credentials (hashed password) for a user.
   * @async
   * @param {string} username - The username of the user.
   * @param {string} password - The new password to hash and update.
   * @return {boolean} - True if the credentials were successfully updated, false otherwise.
   */
  async updateLoginCredentials(username, password) {
    try {
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            reject(new Error("Error hashing password"));
          } else {
            resolve(hash);
          }
        });
      });

      const updateResult = await this.database.updateLoginCredentials(
        username,
        hash,
      );

      if (updateResult) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Retrieves user data from a JWT token.
   * @param {string} token - The JWT token.
   * @return {Object} - User data extracted from the token.
   */
  getData(token) {
    return jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // process.env.JWT_SECRET
  }

  /**
   * Gets the username associated with a store ID.
   * @async
   * @param {*} storeID - The ID of the store.
   * @return {string|null} - The username associated with the store ID, or null if not found.
   */
  async getUsernameByStoreID(storeID) {
    try {
      const result = await this.database.selectUsernameByStoreID(storeID);

      if (result !== null && result !== undefined) {
        return result.username;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Retrieves the hashed password associated with a username.
   * @async
   * @param {string} username - The username of the user.
   * @return {string|null} - The hashed password associated with the username, or null if not found.
   */
  async getPasswordbyUsername(username) {
    try {
      const result = await this.database.selectPasswordByUsername(username);

      if (result !== null && result !== undefined) {
        return result.password;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Updates the password for a user.
   * @async
   * @param {string} username - The username of the user.
   * @param {string} oldPassword - The current password for validation.
   * @param {string} newPassword - The new password to set.
   * @return {boolean} - True if the password was successfully updated, false otherwise.
   */
  async updatePassword(username, oldPassword, newPassword) {
    try {
      const result = await this.getPasswordbyUsername(username);
      logger.info("result: " + result);
      if (result !== null) {
        const passwordMatch = await new Promise((resolve) => {
          bcrypt.compare(oldPassword, result, (err, res) => {
            if (err) {
              logger.warn("Error comparing passwords");
              resolve(false);
            } else {
              resolve(res);
            }
          });
        });
        logger.info("passwordMatch: " + passwordMatch);
        if (passwordMatch) {
          try {
            const updatedCredentials = await this.updateLoginCredentials(
              username,
              newPassword,
            );
            logger.info("updatedCredentials: " + updatedCredentials);
            if (updatedCredentials) {
              logger.info("Password updated");
              return true;
            } else {
              logger.warn("Couldn't update password");
              return false;
            }
          } catch (error) {
            logger.error(error);
            return false;
          }
        } else {
          logger.warn("Passwords do not match");
          return false; // Passwords do not match
        }
      } else {
        logger.warn("User not found");
        return false; // User not found
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Generates a JSON Web Token (JWT) for a user.
   * @async
   * @param {string} user - The username of the user.
   * @return {string|null} - The generated JWT token, or null if user data is not found.
   */
  async generateJWT(user) {
    try {
      const result = await this.database.getStoreDataByUsername(user);
      console.log(result);

      if (result !== null && result !== undefined) {
        console.log("inside genJWT" + result);
        console.log("username " + result.username);
        const storeID = result.storeID;
        const storeName = result.storeName;
        const owner = result.owner;
        const logo = result.logo;
        const telephone = result.telephone;
        const email = result.email;
        const username = user;

        console.log(
          storeID +
            " " +
            storeName +
            " " +
            owner +
            " " +
            logo +
            " " +
            telephone +
            " " +
            email +
            " " +
            username,
        );

        const token = jwt.sign(
          { storeID, storeName, owner, logo, telephone, email, username },
          process.env.JWT_SECRET, // process.env.JWT_SECRET
          {
            algorithm: "HS256",
            subject: "auth_token",
          },
        );
        console.log(token);
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = UserService;
