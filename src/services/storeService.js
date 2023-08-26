require("dotenv").config();
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const storeDetailsObject = require("../utils/storeDetailsObject");
const logger = require("../utils/logger");

const UPLOAD_FOLDER = path.join(__dirname, "../../public/Images/");


/**
 * Service for the store
 * @date 8/25/2023 - 10:49:02 PM
 *
 * @class StoreService
 * @typedef {StoreService}
 */
class StoreService {
  constructor(database, addressService, userService) {
    this.database = database;
    this.addressService = addressService;
    this.userService = userService;
  }

  
  /**
   * Gets all stores from the database
   * @date 8/25/2023 - 8:30:13 PM
   *
   * @async
   * @returns {Object}
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
   * adds a store to the database
   * @date 8/25/2023 - 8:29:59 PM
   *
   * @async
   * @param {*} store
   * @returns {Boolean}
   */
  async addStore(store) {
    if (!store) {
      logger.error("Store is null or undefined");
    }

    try {
      const storeExists = await this.doesStoreExist(store._storeName);
      console.log("doesStoreExist " + storeExists);

      if (!storeExists) {
        const storeZipID = await this.addressService.getZipID(store._zip);
        if (storeZipID !== null && storeZipID !== undefined) {
          const addedAddress = await this.addressService.newAddAddress(
            store._street,
            store._houseNumber,
            store._zip,
            storeZipID
          );

          if (addedAddress) {
            const storeAddressID = await this.addressService.getAddressID(
              store._street,
              store._houseNumber,
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
                  }
                } else {
                  logger.error("Store not added");
                  return {
                    response: "Store not added",
                  }
                }
              } else {
                logger.error("Login credentials not added");
                return {
                  response: "Login credentials not added",
                }
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
   * Gets the settings of a store by storeID
   * @date 8/25/2023 - 8:24:04 PM
   *
   * @async
   * @param {*} storeID
   * @returns {Object}
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

  async updateParameters(settings) {
    /*logger.info("storeID" + settings.storeID);
    logger.info("parameter" + settings.parameter);
    logger.info("value" + settings.value); */
    const parameters = ["storeName", "owner", "telephone", "email"];
    if (!settings) {
      logger.error("Missing parameters");
      return false;
    }

    if (parameters.includes(settings.parameter)) {
      return await this.updatingParameters(
        settings.storeID,
        settings.parameter,
        settings.value
      );
    } else {
      switch (settings.parameter) {
        case "logo":
          try {
            const logoImageBuffer = Buffer.from(settings.value, "base64");
            const logoImageFilename = uuid.v4();
            const logoImageFilepath = path.join(
              UPLOAD_FOLDER,
              logoImageFilename + ".jpg"
            );
            fs.writeFileSync(logoImageFilepath, logoImageBuffer);

            const oldLogoImageFilename =
              await this.database.selectLogoByStoreID(settings.storeID);
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
              settings.storeID,
              settings.parameter,
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
            const backgroundImageBuffer = Buffer.from(settings.value, "base64");
            const backgroundImageFilename = uuid.v4();
            const backgroundImageFilepath = path.join(
              UPLOAD_FOLDER,
              backgroundImageFilename + ".jpg"
            );
            fs.writeFileSync(backgroundImageFilepath, backgroundImageBuffer);
            logger.info("added background image " + backgroundImageFilename);

            const oldBackgroundImageFilename =
              await this.database.selectBackgroundImageByStoreID(
                settings.storeID
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
              settings.storeID,
              settings.parameter,
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
              settings.storeID
            );
            if (username !== null && username !== undefined) {
              const result = await this.userService.updateLoginCredentials(
                username,
                settings.value
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
