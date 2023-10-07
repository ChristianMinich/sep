const AbstractModel = require("./abstractModel");
const svc = require("../services");

/**
 * Represents an Order.
 */
class Order extends AbstractModel {
  /**
   * Creates a new Order instance.
   * @param {number} storeID - The ID of the store.
   * @param {string} timestamp - The timestamp of the order.
   * @param {string} employeeName - The name of the employee.
   * @param {Recipient} recipient - The name of the recipient.
   * @param {string} packageSize - The size of the package.
   * @param {string} handlingInfo - Information about package handling.
   * @param {string} deliveryDate - The delivery date of the order.
   * @param {string} customDropOffPlace - The custom drop-off place for the delivery.
   * @param {string} email - The email address associated with the order.
   */
  constructor(
    storeID,
    timestamp,
    employeeName,
    recipient,
    packageSize,
    handlingInfo,
    deliveryDate,
    customDropOffPlace,
    email
  ) {
    super();
    this._storeID =
      storeID !== null && storeID !== undefined
        ? storeID
        : this.throwError("storeID");
    this._timestamp =
      timestamp !== null && timestamp !== undefined
        ? timestamp
        : this.throwError("timestamp");
    this._employeeName =
      employeeName !== null && employeeName !== undefined
        ? employeeName
        : this.throwError("employeeName");
    this._recipient =
      recipient !== null && recipient !== undefined
        ? recipient
        : this.throwError("recipient");
    this._packageSize =
      packageSize !== null && packageSize !== undefined
        ? packageSize
        : this.throwError("packageSize");
    this._handlingInfo =
      handlingInfo !== null && handlingInfo !== undefined ? handlingInfo : "";
    this._deliveryDate =
      deliveryDate !== null && deliveryDate !== undefined
        ? deliveryDate
        : this.throwError("deliveryDate");
    this._customDropOffPlace =
      customDropOffPlace !== null && customDropOffPlace !== undefined
        ? customDropOffPlace
        : " ";

    this._email = email !== null && email !== undefined ? email : "";
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
   * Places an order.
   * @param {string} storeName - The name of the store.
   * @return {Promise} A promise that resolves when the order is placed.
   */
  placeOrder(storeName) {
    try {
      console.log("called placeOrder in order.js model");
      return svc.orderService.addOrder(this, storeName);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get the store ID.
   * @return {string} The store ID.
   */
  get storeID() {
    return this._storeID;
  }

  /**
   * Set the store ID.
   * @param {string} value - The new store ID.
   */
  set storeID(value) {
    this._storeID = value;
  }

  /**
   * Get the timestamp of the order.
   * @return {string} The timestamp.
   */
  get timestamp() {
    return this._timestamp;
  }

  /**
   * Set the timestamp of the order.
   * @param {string} value - The new timestamp.
   */
  set timestamp(value) {
    this._timestamp = value;
  }

  /**
   * Get the employee name.
   * @return {string} The employee name.
   */
  get employeeName() {
    return this._employeeName;
  }

  /**
   * Set the employee name.
   * @param {string} value - The new employee name.
   */
  set employeeName(value) {
    this._employeeName = value;
  }

  /**
   * Get the recipient.
   * @return {string} The recipient.
   */
  get recipient() {
    return this._recipient;
  }

  /**
   * Set the recipient.
   * @param {string} value - The new recipient.
   */
  set recipient(value) {
    this._recipient = value;
  }

  /**
   * Get the package size.
   * @return {string} The package size.
   */
  get packageSize() {
    return this._packageSize;
  }

  /**
   * Set the package size.
   * @param {string} value - The new package size.
   */
  set packageSize(value) {
    this._packageSize = value;
  }

  /**
   * Get the handling information.
   * @return {string} The handling information.
   */
  get handlingInfo() {
    return this._handlingInfo;
  }

  /**
   * Set the handling information.
   * @param {string} value - The new handling information.
   */
  set handlingInfo(value) {
    this._handlingInfo = value;
  }

  /**
   * Get the delivery date.
   * @return {string} The delivery date.
   */
  get deliveryDate() {
    return this._deliveryDate;
  }

  /**
   * Set the delivery date.
   * @param {string} value - The new delivery date.
   */
  set deliveryDate(value) {
    this._deliveryDate = value;
  }

  /**
   * Get the custom drop-off place.
   * @return {string} The custom drop-off place.
   */
  get customDropOffPlace() {
    return this._customDropOffPlace;
  }

  /**
   * Set the custom drop-off place.
   * @param {string} value - The new custom drop-off place.
   */
  set customDropOffPlace(value) {
    this._customDropOffPlace = value;
  }

  /**
   * Get the email address.
   * @return {string} The email address.
   */
  get email() {
    return this._email;
  }

  /**
   * Set the email address.
   * @param {string} value - The new email address.
   */
  set email(value) {
    this._email = value;
  }
}

module.exports = Order;
