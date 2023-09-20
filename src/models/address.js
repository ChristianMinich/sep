const svc = require("../services");

/**
 * Represents an Address.
 */
class Address {
  /**
   * Creates a new Address instance.
   * @param {string} street - The street address.
   * @param {string} houseNumber - The house number.
   * @param {string} zip - The ZIP code.
   */
  constructor(street, houseNumber, zip) {
    this._street =
      street !== null && street !== undefined && street !== ""
        ? street
        : this.throwError("street");
    this._houseNumber =
      houseNumber !== null && houseNumber !== undefined && houseNumber !== ""
        ? houseNumber
        : this.throwError("houseNumber");
    this._zip =
      zip !== null && zip !== undefined && zip !== ""
        ? zip
        : this.throwError("zip");
  }

  /**
   * Throws an error for a missing property.
   * @param {string} property - The name of the missing property.
   * @throws {Error} An error indicating the missing property.
   */
  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  /**
   * Updates the address for a specific store.
   * @param {string} storeID - The ID of the store.
   * @return {Promise<Boolean>} A promise that resolves when the address is updated.
   */
  updateAddress(storeID) {
    return svc.addressService.updateAddress(storeID, this);
  }

  /**
   * Get the street address.
   * @return {string} The street address.
   */
  get street() {
    return this._street;
  }

  /**
   * Set the street address.
   * @param {string} street - The new street address.
   */
  set street(street) {
    this._street = street;
  }

  /**
   * Get the house number.
   * @return {string} The house number.
   */
  get houseNumber() {
    return this._houseNumber;
  }

  /**
   * Set the house number.
   * @param {string} houseNumber - The new house number.
   */
  set houseNumber(houseNumber) {
    this._houseNumber = houseNumber;
  }

  /**
   * Get the ZIP code.
   * @return {string} The ZIP code.
   */
  get zip() {
    return this._zip;
  }

  /**
   * Set the ZIP code.
   * @param {string} zip - The new ZIP code.
   */
  set zip(zip) {
    this._zip = zip;
  }
}

module.exports = Address;
