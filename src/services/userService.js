require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  constructor(database) {
    this.database = database;
  }
  
  /**
   * Function to validate the password of a user
   * @date 8/12/2023 - 10:51:55 PM
   *
   * @param {*} username
   * @param {*} password
   * @returns {*}
   */
  async validatePassword(username, password) {
    try {
        console.log(username + " " + password);

        if (!username) {
            return false;
        } else {
            const result = await this.database.getPasswordByName(username);
            console.log(result);

            if (!result) {
                console.log("no result");
                return false;
            } else {
                if (result !== null && result !== undefined) {
                    console.log("tried to compare!");
                    const valid = await bcrypt.compare(password, result.password);
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
        console.error(error);
        throw new Error("Error validating password");
    }
}


async addLoginCredentials(username, password) {
  try {
      const result = await this.database.insertLoginCredentials(username, password);

      if (result) {
          return true;
      } else {
          return false;
      }
  } catch (error) {
      console.error(error);
      throw new Error("Error adding login credentials");
  }
}


  getData(token) {
    return jwt.verify(token, process.env.JWT_SECRET); // process.env.JWT_SECRET
  }

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


async updatePassword(username, password) {
  try {
      const result = await this.database.updatePassword(username, password);

      if (result !== null && result !== undefined) {
          return true;
      } else {
          return false;
      }
  } catch (error) {
      console.error(error);
      return false;
  }
}


async generateJWT(user) {
  try {
      const result = await this.database.getStoreDataByUsername(user);
      console.log(result);

      if (result !== null && result !== undefined) {
          console.log("inside genJWT" + result[0]);
          const storeID = result.storeID;
          const storeName = result.storeName;
          const owner = result.owner;
          const logo = result.logo;
          const telephone = result.telephone;
          const email = result.email;
          const username = result.username;

          console.log(storeID + " " + storeName + " " + owner + " " + logo + " " + telephone + " " + email + " " + username)

          const token = jwt.sign(
              { storeID, storeName, owner, logo, telephone, email, username },
              process.env.JWT_SECRET, // process.env.JWT_SECRET
              {
                  algorithm: "HS256",
                  //expiresIn: "12h",
                  subject: "auth_token",
              }
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
