const AbstractModel = require("./abstractModel");
const svc = require("../services");

/**
 * Represents settings for a store.
 */
class Settings extends AbstractModel {
  /**
   * Creates a new Settings instance.
   * @param {string} storeID - The ID of the store.
   * @param {string} parameter - The parameter setting.
   * @param {string} value - The value of the setting.
   */
  constructor(storeID, parameter, value) {
    this._storeID =
      storeID !== null && storeID !== undefined && storeID !== ""
        ? storeID
        : this.throwError("storeID");
    this._parameter =
      parameter !== null && parameter !== undefined && parameter !== ""
        ? parameter
        : this.throwError("parameter");
    this._value =
      value !== null && value !== undefined && value !== ""
        ? value
        : this.throwError("value");
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
   * Updates the parameter setting for the store.
   * @return {Promise} A promise that resolves when the parameter is updated.
   */
  updateParameter() {
    return svc.storeService.updateParameters(this);
  }

  /**
   * Get the ID of the store.
   * @return {string} The store ID.
   */
  get storeID() {
    return this._storeID;
  }

  /**
   * Set the ID of the store.
   * @param {string} storeID - The new store ID.
   */
  set storeID(storeID) {
    this._storeID = storeID;
  }

  /**
   * Get the parameter setting.
   * @return {string} The parameter setting.
   */
  get parameter() {
    return this._parameter;
  }

  /**
   * Set the parameter setting.
   * @param {string} parameter - The new parameter setting.
   */
  set parameter(parameter) {
    this._parameter = parameter;
  }
}

module.exports = Settings;
