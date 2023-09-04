const svc = require("../services");
class Order {
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

  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  placeOrder() {
    try {
      console.log("called placeOrder in order.js model");
      return svc.orderService.addOrder(this);
    } catch (error) {
      return null;
    }
  }

  get storeID() {
    return this._storeID;
  }

  get timestamp() {
    return this._timestamp;
  }

  get employeeName() {
    return this._employeeName;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get street() {
    return this._street;
  }

  get houseNumber() {
    return this._houseNumber;
  }

  get zip() {
    return this._zip;
  }

  get packageSize() {
    return this._packageSize;
  }

  get handlingInfo() {
    return this._handlingInfo;
  }

  get deliveryDate() {
    return this._deliveryDate;
  }

  get customDropOffPlace() {
    return this._customDropOffPlace;
  }

  set storeID(value) {
    this._storeID = value;
  }

  set timestamp(value) {
    this._timestamp = value;
  }

  set employeeName(value) {
    this._employeeName = value;
  }

  set firstName(value) {
    this._firstName = value;
  }

  set lastName(value) {
    this._lastName = value;
  }

  set street(value) {
    this._street = value;
  }

  set houseNumber(value) {
    this._houseNumber = value;
  }

  set zip(value) {
    this._zip = value;
  }

  set packageSize(value) {
    this._packageSize = value;
  }

  set handlingInfo(value) {
    this._handlingInfo = value;
  }

  set deliveryDate(value) {
    this._deliveryDate = value;
  }

  set customDropOffPlace(value) {
    this._customDropOffPlace = value;
  }
}

module.exports = Order;
