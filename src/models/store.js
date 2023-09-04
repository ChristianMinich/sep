const svc = require("../services");

class Store {
  constructor(
    storeName,
    username,
    password,
    owner,
    address,
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
    this._address =
      address !== null && address !== undefined
        ? address
        : this.throwError("address");
    this._telephone =
      telephone !== null && telephone !== undefined
        ? telephone
        : this.throwError("telephone");
    this._email =
      email !== null && email !== undefined ? email : this.throwError("email");
    this._logo =
      logo !== null && logo !== undefined ? logo : "defaultLogo.png";
    this._backgroundImage =
      backgroundImage !== null && backgroundImage !== undefined
        ? backgroundImage
        : this.throwError("backgroundImage");
  }

  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  createStore() {
    try {
      console.log("called createStore in store.js model");
      return svc.storeService.addStore(this);
    } catch (error) {
      return null;
    }
  }

  updateStoreSettings() {
    svc.updateStoreSettings(this);
  }

  // Setter methods

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

  set address(newAddress) {
    this._address = newAddress;
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

  // Getter methods

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

  get address() {
    return this._address;
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

module.exports = Store;
