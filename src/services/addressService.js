const geoLocator = require("./geolocatorService");
const locator = require("./locatorService");
const logger = require("../utils/logger");
class AddressService {
  constructor(database) {
    this.database = database;
  }

  async newAddAddress(street, houseNumber, zip, zipID, recipient = false) {
    if (!street || !houseNumber || !zip) {
      logger.error("Missing required parameters");
      return false;
    }

    const doesAddressExist = await this.database.selectAddressID(
      street,
      houseNumber,
      zipID
    );
    if (doesAddressExist !== null && doesAddressExist !== undefined) {
      if (!recipient) {
        const locatorObject = new locator(houseNumber, street, zip);
        const coordinates = await locatorObject.getCoordinates();
        if (coordinates !== null && coordinates !== undefined && Object.keys(coordinates).length >= 2) {
          try {
            const addedAddress = await this.database.insertAddress(
              street,
              houseNumber,
              coordinates.lon,
              coordinates.lat,
              zipID
            );

            if (addedAddress) {
              return true;
            } else {
              logger.error("Address could not be added");
              return false;
            }
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        try {
          const addedAddress = await this.database.insertAddress(
            street,
            houseNumber,
            null,
            null,
            zipID
          );
          if (addedAddress) {
            return true;
          } else {
            logger.error("Address could not be added");
            return false;
          }
        } catch (error) {
          logger.error(error);
        }
      }
    } else {
      return doesAddressExist;
    }
  }

  async addAddress(street, houseNumber, zip, zipID) {
    if (!street || !houseNumber || !zipID) {
      logger.error("Missing required parameters");
      return false;
    }

    try {
      const coordinates = await geoLocator.getCoordinates(
        street,
        houseNumber,
        zip,
        "Lingen",
        "Niedersachsen",
        "Germany",
        "de"
      );

      if (!coordinates || !coordinates[0]) {
        logger.error("Coordinates could not be retrieved");
        return false;
      }

      try {
        const addedAddress = await this.database.insertAddress(
          street,
          houseNumber,
          coordinates[0].longitude,
          coordinates[0].latitude,
          zipID
        );

        if (addedAddress) {
          return true;
        } else {
          logger.error("Address could not be added");
          return false;
        }
      } catch (error) {
        logger.error(error);
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async getAddressID(street, houseNumber, zipID) {
    console.log("getAddressID: " + street + " " + houseNumber + " " + zipID);

    try {
      const result = await this.database.selectAddressID(
        street,
        houseNumber,
        zipID
      );

      if (result !== null && result !== undefined) {
        console.log("result: " + result);
        return result.ADDRESSID;
      } else {
        return null;
      }
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async newUpdateAddress(storeID, address) {
    if (!address) {
      logger.error("Missing required parameters");
      return false;
    }

    logger.info(
      "Address: " +
        address._street +
        " " +
        address._houseNumber +
        " " +
        address._zip
    );

    try {
      const currentAddressID = await this.getAddressIDByStoreID(
        storeID,
      );
      if (currentAddressID !== null && currentAddressID !== undefined) {
        logger.info("Current AddressID: " + currentAddressID);
        try {
          const newZipID = await this.getZipID(address._zip);
          if (newZipID !== null && newZipID !== undefined) {
            logger.info("New ZIPID: " + newZipID);
            try {
              const locatorObject = new locator(
                address._houseNumber,
                address._street,
                address._zip
              );
              const coordinates = await locatorObject.getCoordinates();
              if (coordinates !== null) {
                logger.info(
                  "New Coordinates: " + coordinates.lon + " " + coordinates.lat
                );
                const updateAddress = await this.database.updateAddress(
                  currentAddressID,
                  address._street,
                  address._houseNumber,
                  coordinates.lon,
                  coordinates.lat,
                  newZipID
                );
                logger.info("Update Address: " + updateAddress);
                if (updateAddress) {
                  logger.info("Address updated");
                  return true;
                } else {
                  logger.error("Address could not be updated");
                  return false;
                }
              } else {
                logger.error("Coordinates could not be retrieved");
                return false;
              }
            } catch (error) {
              logger.error(error);
              return false;
            }
          } else {
            logger.error("ZIPID could not be retrieved");
            return false;
          }
        } catch (error) {
          logger.error(error + "ZIPID PROBLEM");
          return false;
        }
      } else {
        logger.error("AddressID could not be retrieved");
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async updateAddress(addressID, street, houseNumber, zipID) {
    try {
      const coordinates = await geoLocator.getCoordinates(
        street,
        houseNumber,
        "Lingen",
        "Niedersachsen",
        "Germany",
        "de"
      );

      if (!coordinates || !coordinates[0]) {
        logger.error("Coordinates could not be retrieved");
        return false;
      }

      try {
        const result = await this.database.updateAddress(
          addressID,
          street,
          houseNumber,
          coordinates[0].longitude,
          coordinates[0].latitude,
          zipID
        );

        if (result) {
          return result;
        } else {
          logger.error("Address could not be updated");
          return false;
        }
      } catch (error) {
        logger.error(error);
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async getAddressIDByStoreID(storeID) {
    try {
      const result = await this.database.selectAddressIDByStoreID(storeID);

      if (result !== null && result !== undefined) {
        return result.addressID;
      } else {
        return null;
      }
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async getZipID(zip) {
    logger.info("Zip " + zip);
    try {
      const result = await this.database.selectZipID(zip);
      logger.info("ZipID " + result.ZIPID);
      if (result !== null && result !== undefined) {
        return result.ZIPID;
      } else {
        return null;
      }
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}

module.exports = AddressService;
