const geoLocator = require("./geolocatorService");
class AddressService {
  constructor(database) {
    this.database = database;
  }

  async addAddress(street, houseNumber, zip, zipID) {
    if (!street || !houseNumber || !zipID) {
      throw new Error("Missing required parameters");
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
        throw new Error("Coordinates could not be retrieved");
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
          throw new Error("Address could not be added");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error adding address");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving coordinates");
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
      console.error(error);
      throw new Error("Error retrieving AddressID");
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
        throw new Error("Coordinates could not be found");
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
          throw new Error("Address could not be updated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error updating address");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving coordinates");
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
      console.error(error);
      throw new Error("Error retrieving AddressID by StoreID");
    }
  }

  async getZipID(zip) {
    try {
      const result = await this.database.selectZipID(zip);

      if (result !== null && result !== undefined) {
        return result.ZIPID;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving ZIPID");
    }
  }
}

module.exports = AddressService;
