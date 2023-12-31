/**
 * Load environment variables from a .env file (if available).
 */
require("dotenv").config();

const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const storeDetailsObject = require("../utils/storeDetailsObject");
const logger = require("../utils/logger");

const UPLOAD_FOLDER = path.join(__dirname, "../../public/Images/");

/**
 * Service for managing store-related operations.
 * @class
 * @typedef {StoreService}
 * @date 8/25/2023 - 10:49:02 PM
 */
class StoreService {
  /**
   * Creates an instance of StoreService.
   * @constructor
   * @param {Object} database - The database service for interacting with the database.
   * @param {Object} addressService - The address service for handling address-related operations.
   * @param {Object} userService - The user service for managing user-related operations.
   */
  constructor(database, addressService, userService) {
    this.database = database;
    this.addressService = addressService;
    this.userService = userService;
  }

  /**
   * Retrieves details of all stores from the database.
   * @async
   * @return {Object[]} - An array of store details objects.
   */
  async storeDetails() {
    try {
      const result = await this.database.storeDetails();

      if (result === null || result === undefined) {
        return null;
      }

      const details = result.map((item) => {
        return storeDetailsObject.createObject(
          String(item.id),
          item.name,
          item.owner,
          item.street,
          item.houseNumber,
          String(item.zip),
          "Lingen",
          item.telephone,
          item.email,
          `http://131.173.65.77:8080/Images/${item.logo}.jpg`,
          `http://131.173.65.77:8080/Images/${item.backgroundImage}.jpg`,
          item.longitude,
          item.latitude
        );
      });

      return details.reverse();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Adds a new store to the database.
   * @async
   * @param {*} store - The store object to be added.
   * @return {Object} - An object with a response indicating the result of the operation.
   */
  async addStore(store) {
    if (!store) {
      logger.error("Store is null or undefined");
    }

    try {
      const storeExists = await this.doesStoreExist(store._storeName);
      console.log("doesStoreExist " + storeExists);

      if (!storeExists) {
        const storeZipID = await this.addressService.getZipID(
          store._address._zip
        );
        if (storeZipID !== null && storeZipID !== undefined) {
          const addedAddress = await this.addressService.addAddress(
            store._address._street,
            store._address._houseNumber,
            store._address._zip,
            storeZipID
          );

          if (addedAddress) {
            const storeAddressID = await this.addressService.getAddressID(
              store._address._street,
              store._address._houseNumber,
              storeZipID
            );

            console.log("storeAddressID: " + storeAddressID);

            if (storeAddressID !== null && storeAddressID !== undefined) {
              const addedLoginCredentials =
                await this.userService.addLoginCredentials(
                  store._username,
                  store._password
                );

              console.log("addedLoginCredentials: " + addedLoginCredentials);

              if (addedLoginCredentials) {
                const logoImageBuffer = Buffer.from(store._logo, "base64");
                const logoImageFilename = uuid.v4();
                const logoImageFilepath = path.join(
                  UPLOAD_FOLDER,
                  logoImageFilename + ".jpg"
                );
                fs.writeFileSync(logoImageFilepath, logoImageBuffer);

                const backgroundImageBuffer = Buffer.from(
                  store._backgroundImage,
                  "base64"
                );
                const backgroundImageFilename = uuid.v4();
                const backgroundImageFilepath = path.join(
                  UPLOAD_FOLDER,
                  backgroundImageFilename + ".jpg"
                );
                fs.writeFileSync(
                  backgroundImageFilepath,
                  backgroundImageBuffer
                );

                const addedStore = await this.database.insertStore(
                  store._storeName,
                  store._owner,
                  logoImageFilename,
                  backgroundImageFilename,
                  store._telephone,
                  store._email,
                  storeZipID,
                  storeAddressID,
                  store._username
                );

                if (addedStore) {
                  return {
                    response: "Store added",
                  };
                } else {
                  logger.error("Store not added");
                  return {
                    response: "Store not added",
                  };
                }
              } else {
                logger.error("Login credentials not added");
                return {
                  response: "Login credentials not added",
                };
              }
            } else {
              logger.error("AddressID not found");
              return {
                response: "AddressID not found",
              };
            }
          } else {
            logger.error("Address not added");
            return {
              response: "Address not added",
            };
          }
        } else {
          logger.error("ZipID not found");
          return {
            response: "ZipID not found",
          };
        }
      } else {
        logger.error("Store already exists");
        return {
          response: "Store already exists",
        };
      }
    } catch (error) {
      logger.error(error);
      return {
        response: "Error adding store",
      };
    }
  }

  /**
   * Checks if a store with the given name exists in the database.
   *
   * @param {string} storeName - The name of the store to check for existence.
   * @return {Promise<boolean>} A promise that resolves to `true` if the store exists,
   *                            or `false` if it doesn't.
   * @throws {Error} If an error occurs while checking the store's existence.
   */
  async doesStoreExist(storeName) {
    try {
      const exists = await this.database.getExistingStore(storeName);
      return exists;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Gets the settings of a store by its storeID.
   * @async
   * @param {*} storeID - The ID of the store.
   * @return {Object} - An object containing store settings.
   */
  async getSettings(storeID) {
    try {
      const store = await this.database.selectStoreByStoreID(storeID);

      if (store) {
        const address = await this.database.selectAddressByAddressID(
          store.ADDRESSID
        );

        if (address) {
          const zip = await this.database.selectZIPByZipID(address.ZIPID);

          if (zip !== null && zip !== undefined) {
            const response = {
              storeID: storeID,
              storeName: store.STORENAME,
              owner: store.OWNER,
              address: {
                street: address.STREET,
                houseNumber: address.HOUSENUMBER,
                zip: String(zip.ZIP),
              },
              telephone: store.TELEPHONE,
              email: store.EMAIL,
              logo:
                "http://" +
                process.env.server_address +
                ":" +
                process.env.PORT +
                process.env.image_folder +
                store.LOGO +
                ".jpg",
              backgroundImage:
                "http://" +
                process.env.server_address +
                ":" +
                process.env.PORT +
                process.env.image_folder +
                store.BACKGROUNDIMAGE +
                ".jpg",
            };
            return response;
          } else {
            logger.error("Zip could not be found");
            return null;
          }
        } else {
          logger.error("Address could not be found");
          return null;
        }
      } else {
        logger.error("Settings could not be found");
        return null;
      }
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  /**
   * Updates the settings of a store.
   * @async
   * @param {Object} settings - The updated store settings.
   * @return {boolean} - True if the settings were successfully updated, false otherwise.
   */
  async setSettings(settings) {
    try {
      console.log(settings);

      const zipID = await this.addressService.getZipID(settings._zip);

      if (zipID !== null && zipID !== undefined) {
        const old_addressID = await this.addressService.getAddressIDByStoreID(
          settings._storeID
        );

        console.log("AddressID" + old_addressID);

        if (old_addressID !== null && old_addressID !== undefined) {
          const updatedAddress = await this.addressService.updateAddress(
            old_addressID,
            settings._street,
            settings._houseNumber,
            zipID
          );

          if (updatedAddress) {
            const updatedStore = await this.database.updateStore(
              settings._storeID,
              settings._storeName,
              settings._owner,
              settings._telephone,
              settings._email,
              zipID,
              old_addressID
            );

            if (updatedStore) {
              return true;
            } else {
              logger.error("Store could not be updated");
              return false;
            }
          } else {
            logger.error("Address could not be updated");
            return false;
          }
        } else {
          logger.error("AddressID could not be found");
          return false;
        }
      } else {
        logger.error("ZipID could not be found");
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  /**
   * Updates specific parameters of a store.
   * @async
   * @param {Object} settings - The updated store parameters.
   * @return {boolean|string} - True if the parameters were successfully updated, false otherwise. Returns "invalid Parameter" for invalid parameter values.
   */
  async updateParameters(settings) {
    const parameters = ["storeName", "owner", "telephone", "email"];
    if (!settings) {
      logger.error("Missing parameters");
      return false;
    }

    if (parameters.includes(settings._parameter)) {
      return await this.updatingParameters(
        settings._storeID,
        settings._parameter,
        settings._value
      );
    } else {
      switch (settings._parameter) {
        case "logo":
          try {
            const logoImageBuffer = Buffer.from(settings._value, "base64");
            const logoImageFilename = uuid.v4();
            const logoImageFilepath = path.join(
              UPLOAD_FOLDER,
              logoImageFilename + ".jpg"
            );
            fs.writeFileSync(logoImageFilepath, logoImageBuffer);

            const oldLogoImageFilename =
              await this.database.selectLogoByStoreID(settings._storeID);
            if (
              oldLogoImageFilename !== null &&
              oldLogoImageFilename !== undefined
            ) {
              const oldLogoImageFilepath = path.join(
                UPLOAD_FOLDER,
                oldLogoImageFilename.logo + ".jpg"
              );
              fs.unlinkSync(oldLogoImageFilepath);
            }

            const result = await this.updatingParameters(
              settings._storeID,
              settings._parameter,
              logoImageFilename
            );
            if (result) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            logger.error(error);
            return false;
          }

        case "backgroundImage":
          try {
            const backgroundImageBuffer = Buffer.from(
              settings._value,
              "base64"
            );
            const backgroundImageFilename = uuid.v4();
            const backgroundImageFilepath = path.join(
              UPLOAD_FOLDER,
              backgroundImageFilename + ".jpg"
            );
            fs.writeFileSync(backgroundImageFilepath, backgroundImageBuffer);
            logger.info("added background image " + backgroundImageFilename);

            const oldBackgroundImageFilename =
              await this.database.selectBackgroundImageByStoreID(
                settings._storeID
              );
            if (
              oldBackgroundImageFilename !== null &&
              oldBackgroundImageFilename !== undefined
            ) {
              const oldBackgroundImageFilepath = path.join(
                UPLOAD_FOLDER,
                oldBackgroundImageFilename.backgroundImage + ".jpg"
              );
              fs.unlinkSync(oldBackgroundImageFilepath);
            }
            logger.info(
              "deleted old background image " +
                oldBackgroundImageFilename.backgroundImage
            );

            const result = await this.updatingParameters(
              settings._storeID,
              settings._parameter,
              backgroundImageFilename
            );
            if (result) {
              logger.info("Background image updated");
              return true;
            } else {
              logger.warn("Background image could not be updated");
              return false;
            }
          } catch (error) {
            logger.error(error);
            return false;
          }

        case "password":
          try {
            const username = await this.database.selectUsernameByStoreID(
              settings._storeID
            );
            if (username !== null && username !== undefined) {
              const result = await this.userService.updateLoginCredentials(
                username,
                settings._value
              );
              if (result) {
                return true;
              } else {
                logger.warn("Password could not be updated");
                return false;
              }
            } else {
              logger.error("Username not found");
              return false;
            }
          } catch (error) {
            logger.error(error);
            return false;
          }

        default:
          return "invalid Parameter";
      }
    }
  }

  /**
   * Updates specific parameters of a store.
   * @async
   * @param {string} storeID - The ID of the store to update.
   * @param {string} parameter - The parameter to update.
   * @param {string} value - The new value for the parameter.
   * @return {boolean} - True if the parameters were successfully updated, false otherwise.
   */
  async updatingParameters(storeID, parameter, value) {
    if (!storeID || !parameter || !value) {
      logger.error("Missing parameters");
      return false;
    }
    const result = await this.database.updateParameter(
      parameter,
      value,
      storeID
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StoreService;
