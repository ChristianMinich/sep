const svc = require("../services");
class Order {
  constructor(
    storeID,
    timestamp,
    employeeName,
    firstName,
    lastName,
    street,
    houseNumber,
    zip,
    packageSize,
    handlingInfo,
    deliveryDate,
    customDropOffPlace
  ) {
    this.storeID =
      storeID !== null && storeID !== undefined
        ? storeID
        : this.throwError("storeID");
    this.timestamp =
      timestamp !== null && timestamp !== undefined
        ? timestamp
        : this.throwError("timestamp");
    this.employeeName =
      employeeName !== null && employeeName !== undefined
        ? employeeName
        : this.throwError("employeeName");
    this.firstName =
      firstName !== null && firstName !== undefined
        ? firstName
        : this.throwError("firstName");
    this.lastName =
      lastName !== null && lastName !== undefined
        ? lastName
        : this.throwError("lastName");
    this.street =
      street !== null && street !== undefined
        ? street
        : this.throwError("street");
    this.houseNumber =
      houseNumber !== null && houseNumber !== undefined
        ? houseNumber
        : this.throwError("houseNumber");
    this.zip = zip !== null && zip !== undefined ? zip : this.throwError("zip");
    this.packageSize =
      packageSize !== null && packageSize !== undefined
        ? packageSize
        : this.throwError("packageSize");
    this.handlingInfo =
      handlingInfo !== null && handlingInfo !== undefined
        ? handlingInfo
        : "";
    this.deliveryDate =
      deliveryDate !== null && deliveryDate !== undefined
        ? deliveryDate
        : this.throwError("deliveryDate");
    this.customDropOffPlace = customDropOffPlace;
      customDropOffPlace !== null && customDropOffPlace !== undefined
        ? customDropOffPlace
        : "";
  }

  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  validateOrder(order) {
    const orderProperties = Object.values(order);
    for (const property of orderProperties) {
      if (property === undefined || property === null) {
        return false;
      }
    }
    return true;
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
