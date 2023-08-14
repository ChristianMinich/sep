const svc = require("../services");

class store {
  constructor(
    storeName,
    username,
    password,
    owner,
    street,
    houseNumber,
    zip,
    telephone,
    email,
    logo,
    backgroundImage
  ) {
    this._storeName =
    storeName !== null && storeName !== undefined
        ? storeName
        : this.throwError("storeName");
    this._username =
      username !== null && username !== undefined
        ? username
        : this.throwError("username");
    this._password =
      password !== null && password !== undefined
        ? password
        : this.throwError("password");
    this._owner =
      owner !== null && owner !== undefined ? owner : this.throwError("owner");
    this._street =
      street !== null && street !== undefined
        ? street
        : this.throwError("street");
    this._houseNumber =
      houseNumber !== null && houseNumber !== undefined
        ? houseNumber
        : this.throwError("houseNumber");
    this._zip = zip !== null && zip !== undefined ? zip : this.throwError("zip");
    this._telephone =
      telephone !== null && telephone !== undefined
        ? telephone
        : this.throwError("telephone");
    this._email =
      email !== null && email !== undefined ? email : this.throwError("email");
    this._logo =
      logo !== null && logo !== undefined ? logo : "defaultLogo.png";
    this._backgroundImage =
    backgroundImage !== null && backgroundImage !== undefined ? backgroundImage : this.throwError("backgroundImage");
  }

  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  validateStore(store) {
    const storeProperties = Object.values(store);
    for (const property of storeProperties) {
      if (property === undefined || property === null || property === "") {
        return false;
      }
    }
    return true;
  }

  createStore() {
      try {
        console.log("called createStore in store.js model")
        return svc.storeService.addStore(this);
      } catch (error) {
        return null;
      }
  }

  updateStoreSettings() {
    svc.updateStoreSettings(this);
  }

  set storeName(newStoreName) {
    this._storeName = newStoreName;
  }

  set username(newUsername) {
    this._username = newUsername;
  }

  set password(newPassword) {
    this._password = newPassword;
  }

  set owner(newOwner) {
    this._owner = newOwner;
  }

  set street(newStreet) {
    this._street = newStreet;
  }

  set houseNumber(newHouseNumber) {
    this._houseNumber = newHouseNumber;
  }

  set zip(newZip) {
    this._zip = newZip;
  }

  set telephone(newTelephone) {
    this._telephone = newTelephone;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  set logo(newLogo) {
    this._logo = newLogo;
  }

  set backgroundImage(newBackgroundImage) {
    this._backgroundImage = newBackgroundImage;
  }

  get storeName() {
    return this._storeName;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get owner() {
    return this._owner;
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

  get telephone() {
    return this._telephone;
  }

  get email() {
    return this._email;
  }

  get logo() {
    return this._logo;
  }

  get backgroundImage() {
    return this._backgroundImage;
  }
}

module.exports = store;
