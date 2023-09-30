const AbstractModel = require("./abstractModel");
const svc = require("../services");

/**
 * Represents a store.
 */
class Store extends AbstractModel {
  /**
   * Creates a new Store instance.
   * @param {string} storeName - The name of the store.
   * @param {string} username - The username for the store.
   * @param {string} password - The password for the store.
   * @param {string} owner - The owner of the store.
   * @param {string} address - The address of the store.
   * @param {string} telephone - The telephone number of the store.
   * @param {string} email - The email address of the store.
   * @param {string} logo - The logo of the store (defaulted to "defaultLogo.png" if not provided).
   * @param {string} backgroundImage - The background image of the store.
   */
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
    this._logo = logo !== null && logo !== undefined ? logo : "defaultLogo.png";
    this._backgroundImage =
      backgroundImage !== null && backgroundImage !== undefined
        ? backgroundImage
        : this.throwError("backgroundImage");
  }

  /**
   * Throws an error for a missing property.
   * @param {string} property - The name of the missing property.
   * @throws {Error} An error indicating the missing property.
   * @return {void}
   */
  throwError(property) {
    throw new Error(`Missing property ${property}`);
  }

  /**
   * Creates a new store.
   * @return {Promise<void>} A promise that resolves when the store is created.
   */
  createStore() {
    try {
      console.log("called createStore in store.js model");
      return svc.storeService.addStore(this);
    } catch (error) {
      return null;
    }
  }

  /**
   * Updates store settings.
   * @return {void}
   */
  updateStoreSettings() {
    svc.updateStoreSettings(this);
  }

  /**
   * Get the name of the store.
   * @param {string} newStoreName - The new store name.
   * @return {void}
   */
  set storeName(newStoreName) {
    this._storeName = newStoreName;
  }

  /**
   * Set the username for the store.
   * @param {string} newUsername - The new username.
   * @return {void}
   */
  set username(newUsername) {
    this._username = newUsername;
  }

  /**
   * Set the password for the store.
   * @param {string} newPassword - The new password.
   * @return {void}
   */
  set password(newPassword) {
    this._password = newPassword;
  }

  /**
   * Set the owner of the store.
   * @param {string} newOwner - The new owner's name.
   * @return {void}
   */
  set owner(newOwner) {
    this._owner = newOwner;
  }

  /**
   * Set the address of the store.
   * @param {string} newAddress - The new store's address.
   * @return {void}
   */
  set address(newAddress) {
    this._address = newAddress;
  }

  /**
   * Set the telephone number of the store.
   * @param {string} newTelephone - The new telephone number.
   * @return {void}
   */
  set telephone(newTelephone) {
    this._telephone = newTelephone;
  }

  /**
   * Set the email address of the store.
   * @param {string} newEmail - The new email address.
   * @return {void}
   */
  set email(newEmail) {
    this._email = newEmail;
  }

  /**
   * Set the logo of the store.
   * @param {string} newLogo - The new logo filename.
   * @return {void}
   */
  set logo(newLogo) {
    this._logo = newLogo;
  }

  /**
   * Set the background image of the store.
   * @param {string} newBackgroundImage - The new background image filename.
   * @return {void}
   */
  set backgroundImage(newBackgroundImage) {
    this._backgroundImage = newBackgroundImage;
  }

  /**
   * Get the name of the store.
   * @return {string} The store name.
   */
  get storeName() {
    return this._storeName;
  }

  /**
   * Get the username for the store.
   * @return {string} The username.
   */
  get username() {
    return this._username;
  }

  /**
   * Get the password for the store.
   * @return {string} The password.
   */
  get password() {
    return this._password;
  }

  /**
   * Get the owner of the store.
   * @return {string} The owner's name.
   */
  get owner() {
    return this._owner;
  }

  /**
   * Get the address of the store.
   * @return {string} The store's address.
   */
  get address() {
    return this._address;
  }

  /**
   * Get the telephone number of the store.
   * @return {string} The telephone number.
   */
  get telephone() {
    return this._telephone;
  }

  /**
   * Get the email address of the store.
   * @return {string} The email address.
   */
  get email() {
    return this._email;
  }

  /**
   * Get the logo of the store.
   * @return {string} The logo filename.
   */
  get logo() {
    return this._logo;
  }

  /**
   * Get the background image of the store.
   * @return {string} The background image filename.
   */
  get backgroundImage() {
    return this._backgroundImage;
  }
}

module.exports = Store;
