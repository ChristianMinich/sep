const AbstractModel = require("./abstractModel");
/**
 * Represents a recipient.
 */
class Recipient extends AbstractModel {
  /**
   * Creates a new Recipient instance.
   * @param {string} firstName - The first name of the recipient.
   * @param {string} lastName - The last name of the recipient.
   * @param {Address} address - The address of the recipient.
   */
  constructor(firstName, lastName, address) {
    this._firstName =
      firstName !== null && firstName !== undefined
        ? firstName
        : this.throwError("firstName");
    this._lastName =
      lastName !== null && lastName !== undefined
        ? lastName
        : this.throwError("lastName");
    this._address =
      address !== null && address !== undefined
        ? address
        : this.throwError("address");
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
   * Get the first name of the recipient.
   * @return {string} The first name.
   */
  get firstName() {
    return this._firstName;
  }

  /**
   * Set the first name of the recipient.
   * @param {string} firstName - The new first name.
   */
  set firstName(firstName) {
    this._firstName = firstName;
  }

  /**
   * Get the last name of the recipient.
   * @return {string} The last name.
   */
  get lastName() {
    return this._lastName;
  }

  /**
   * Set the last name of the recipient.
   * @param {string} lastName - The new last name.
   */
  set lastName(lastName) {
    this._lastName = lastName;
  }

  /**
   * Get the address of the recipient.
   * @return {Address} The address.
   */
  get address() {
    return this._address;
  }

  /**
   * Set the address of the recipient.
   * @param {Address} address - The new address.
   */
  set address(address) {
    this._address = address;
  }
}

module.exports = Recipient;
