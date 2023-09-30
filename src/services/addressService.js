const Locator = require("./locatorService");
const logger = require("../utils/logger");
/**
 * Service for managing address-related operations.
 */
class AddressService {
  /**
   * Creates an instance of AddressService.
   *
   * @param {object} database - The database instance.
   */
  constructor(database) {
    this.database = database;
  }

  /**
   * Adds a new address to the database.
   *
   * @param {string} street - The street name.
   * @param {string} houseNumber - The house number.
   * @param {string} zip - The ZIP code.
   * @param {number} zipID - The ZIP code ID.
   * @param {boolean} [recipient=false] - Indicates if it's a recipient address.
   * @async
   * @return {Promise<boolean>} A Promise that resolves to true if the address was added successfully, or false otherwise.
   */
  async addAddress(street, houseNumber, zip, zipID, recipient = false) {
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
        const locatorObject = new Locator(houseNumber, street, zip);
        const coordinates = await locatorObject.getCoordinates();
        if (
          coordinates !== null &&
          coordinates !== undefined &&
          Object.keys(coordinates).length >= 2
        ) {
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

  /**
   * Retrieves the address ID based on street, house number, and ZIP code ID.
   *
   * @param {string} street - The street name.
   * @param {string} houseNumber - The house number.
   * @param {number} zipID - The ZIP code ID.
   * @async
   * @return {Promise<number|null>} A Promise that resolves to the address ID if found, or null if not found.
   */
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

  /**
   * Updates the address of a store.
   * @param {string} storeID - The ID of the store to update the address for.
   * @param {object} address - The new address object containing street, houseNumber, and zip properties.
   * @param {string} address._street - The street of the new address.
   * @param {string} address._houseNumber - The house number of the new address.
   * @param {string} address._zip - The ZIP code of the new address.
   * @async
   * @return {Promise<boolean>} A promise that resolves to `true` if the address is updated successfully, or `false` otherwise.
   */
  async updateAddress(storeID, address) {
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
      const currentAddressID = await this.getAddressIDByStoreID(storeID);
      if (currentAddressID !== null && currentAddressID !== undefined) {
        logger.info("Current AddressID: " + currentAddressID);
        try {
          const newZipID = await this.getZipID(address._zip);
          if (newZipID !== null && newZipID !== undefined) {
            logger.info("New ZIPID: " + newZipID);
            try {
              const locatorObject = new Locator(
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

  /**
   * Retrieves the address ID associated with a store.
   *
   * @param {number} storeID - The store ID.
   * @async
   * @return {Promise<number|null>} A Promise that resolves to the address ID if found, or null if not found.
   */
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

  /**
   * Retrieves the ZIP code ID based on a ZIP code.
   *
   * @param {string} zip - The ZIP code.
   * @async
   * @return {Promise<number|null>} A Promise that resolves to the ZIP code ID if found, or null if not found.
   */
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
