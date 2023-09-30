const AbstractRepository = require("./abstractRepository");
/**
 * UserRepository class for managing user-related database operations.
 * @extends AbstractRepository
 */
class UserRepository extends AbstractRepository {
  /**
   * Constructs a new UserRepository instance.
   *
   * @param {Database} database - The database connection.
   */
  constructor(database) {
    super(database);
  }

  /**
   * Retrieves the password for a given username.
   *
   * @param {string} username - The username to retrieve the password for.
   * @return {Promise<string>} A Promise that resolves with the password.
   */
  getPasswordByName(username) {
    const sql = "SELECT password FROM LOGINCREDENTIALS WHERE username = ?";
    const params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Adds a registration code to the database.
   *
   * @param {string} code - The registration code to add.
   * @return {Promise<void>} A Promise that resolves when the code is added.
   */
  addRegisterCode(code) {
    const sql = "INSERT INTO REGISTRATION_CODES (CODE) VALUES (?)";
    const params = [code];
    return this.database.updateTable(sql, params);
  }

  /**
   * Retrieves a registration code from the database.
   *
   * @param {string} code - The registration code to retrieve.
   * @return {Promise<string>} A Promise that resolves with the code.
   */
  getRegisterCode(code) {
    const sql = "SELECT CODE FROM REGISTRATION_CODES WHERE CODE = ?";
    const params = [code];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves store data by username.
   *
   * @param {string} username - The username associated with the store.
   * @return {Promise<object|null>} A Promise that resolves with an object containing store data
   * or null if no store is found with the given username.
   */
  getStoreDataByUsername(username) {
    const sql = `
    SELECT
        storeID,
        storeName,
        owner,
        logo,
        telephone,
        email
    FROM
        STORE
    WHERE
        username = ?;
    `;
    const params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Checks if a store with the given storeName exists in the database.
   *
   * @param {string} storeName - The name of the store to check for existence.
   * @return {Promise<string|null>} A Promise that resolves with the storeName if it exists,
   * or null if no store with the given name is found.
   */
  getExistingStore(storeName) {
    const sql = "SELECT storeName FROM STORE WHERE storeName = ?";
    const params = [storeName];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves details of all stores including store ID, name, owner, address, contact information, and location.
   *
   * @return {Promise<Array<Object>>} A Promise that resolves with an array of store details objects,
   * where each object contains store information such as ID, name, owner, address, contact, and location.
   */
  storeDetails() {
    const sql = `
    SELECT
        s.storeID AS id,
        s.storeName AS name,
        s.owner AS owner,
        a.street AS street,
        a.houseNumber AS houseNumber,
        z.zip AS zip,
        s.telephone AS telephone,
        s.email AS email,
        s.logo AS logo,
        s.backgroundImage AS backgroundImage,
        a.longitude AS longitude,
        a.latitude AS latitude
    FROM
        STORE s
    JOIN
        ADDRESS a ON s.addressID = a.addressID
    JOIN
        ZIP z ON a.zipID = z.zipID
    ORDER BY
        s.storeID DESC;
    `;
    return this.database.queryAllData(sql);
  }

  /**
   * Inserts login credentials (username and password) into the database.
   *
   * @param {string} username - The username to be inserted.
   * @param {string} password - The hashed password to be inserted.
   * @return {Promise<boolean>} A Promise that resolves with a boolean indicating the success of the operation.
   */
  insertLoginCredentials(username, password) {
    const sql = `
    INSERT INTO
        LOGINCREDENTIALS (username, password)
    VALUES
        (?, ?);
    `;
    const params = [username, password];
    return this.database.insertTuple(sql, params);
  }

  /**
   * Inserts store information into the database.
   *
   * @param {string} storeName - The name of the store to be inserted.
   * @param {string} owner - The owner of the store to be inserted.
   * @param {string} logo - The logo URL of the store to be inserted.
   * @param {string} backgroundImage - The background image URL of the store to be inserted.
   * @param {string} telephone - The telephone number of the store to be inserted.
   * @param {string} email - The email address of the store to be inserted.
   * @param {number} zipID - The ID of the ZIP code associated with the store's address.
   * @param {number} addressID - The ID of the address associated with the store.
   * @param {string} username - The username associated with the store.
   * @return {Promise<boolean>} A Promise that resolves with a boolean indicating the success of the operation.
   */
  insertStore(
    storeName,
    owner,
    logo,
    backgroundImage,
    telephone,
    email,
    zipID,
    addressID,
    username
  ) {
    const sql = `
    INSERT INTO
        STORE (storeName, owner, logo, backgroundImage, telephone, email, zipID, addressID, username)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const params = [
      storeName,
      owner,
      logo,
      backgroundImage,
      telephone,
      email,
      zipID,
      addressID,
      username
    ];
    return this.database.queryWithoutResponse(sql, params);
  }

  /**
   * Inserts address information into the database.
   *
   * @param {string} street - The street name of the address to be inserted.
   * @param {string} houseNumber - The house number of the address to be inserted.
   * @param {number} longitude - The longitude coordinate of the address to be inserted.
   * @param {number} latitude - The latitude coordinate of the address to be inserted.
   * @param {number} zipID - The ID of the ZIP code associated with the address.
   * @return {Promise<boolean>} A Promise that resolves with a boolean indicating the success of the operation.
   */
  insertAddress(street, houseNumber, longitude, latitude, zipID) {
    const sql = `
    INSERT INTO
        ADDRESS (street, houseNumber, longitude, latitude, zipID)
    VALUES
        (?, ?, ?, ?, ?);
    `;
    const params = [street, houseNumber, longitude, latitude, zipID];
    return this.database.insertTuple(sql, params);
  }

  /**
   * Retrieves the username associated with a specific store ID from the database.
   *
   * @param {number} storeID - The ID of the store for which to retrieve the username.
   * @return {Promise<string|null>} A Promise that resolves with the username if found, or null if not found.
   */
  selectUsernameByStoreID(storeID) {
    const sql = "SELECT username FROM STORE WHERE storeID = ?";
    const params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the password associated with a specific username from the database.
   *
   * @param {string} username - The username for which to retrieve the password.
   * @return {Promise<string|null>} A Promise that resolves with the password if found, or null if not found.
   */
  selectPasswordByUsername(username) {
    const sql = "SELECT password FROM LOGINCREDENTIALS WHERE username = ?";
    const params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves store information based on a store's unique identifier (storeID).
   *
   * @param {number} storeID - The unique identifier of the store.
   * @return {Promise<Object|null>} A Promise that resolves with store information if found, or null if not found.
   */
  selectStoreByStoreID(storeID) {
    const sql = "SELECT * FROM STORE WHERE storeID = ?";
    const params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the storeID associated with a store's name.
   *
   * @param {string} storeName - The name of the store to search for.
   * @return {Promise<number|null>} A Promise that resolves with the storeID if found, or null if not found.
   */
  selectStoreID(storeName) {
    const sql = "SELECT storeID FROM STORE WHERE storeNAME = ?";
    const params = [storeName];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves address information based on the addressID.
   *
   * @param {number} addressID - The ID of the address to retrieve information for.
   * @return {Promise<object|null>} A Promise that resolves with the address data if found, or null if not found.
   */
  selectAddressByAddressID(addressID) {
    const sql = "SELECT * FROM ADDRESS WHERE addressID = ?";
    const params = [addressID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the addressID associated with a store based on the storeID.
   *
   * @param {number} storeID - The ID of the store for which to retrieve the associated addressID.
   * @return {Promise<number|null>} A Promise that resolves with the associated addressID if found, or null if not found.
   */
  selectAddressIDByStoreID(storeID) {
    const sql = "SELECT addressID FROM STORE WHERE storeID = ?";
    const params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the addressID associated with an address based on the street, houseNumber, and zipID.
   *
   * @param {string} street - The street name of the address.
   * @param {string} houseNumber - The house number of the address.
   * @param {number} zipID - The ID of the ZIP code associated with the address.
   * @return {Promise<number|null>} A Promise that resolves with the associated addressID if found, or null if not found.
   */
  selectAddressID(street, houseNumber, zipID) {
    const sql = `
    SELECT
        ADDRESSID
    FROM
        ADDRESS
    WHERE
        street = ?
    AND
        houseNumber = ?
    AND
        zipID = ?;
    `;
    const params = [street, houseNumber, zipID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the ZIP code associated with a given zipID.
   *
   * @param {number} zipID - The ID of the ZIP code to retrieve.
   * @return {Promise<string|null>} A Promise that resolves with the ZIP code if found, or null if not found.
   */
  selectZIPByZipID(zipID) {
    const sql = "SELECT ZIP FROM ZIP WHERE zipID = ?";
    const params = [zipID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the ID associated with a given ZIP code.
   *
   * @param {string} zip - The ZIP code to retrieve the ID for.
   * @return {Promise<number|null>} A Promise that resolves with the ZIP ID if found, or null if not found.
   */
  selectZipID(zip) {
    const sql = "SELECT ZIPID FROM ZIP WHERE ZIP = ?";
    const params = [zip];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the logo associated with a store using its ID.
   *
   * @param {number} storeID - The ID of the store to retrieve the logo for.
   * @return {Promise<string|null>} A Promise that resolves with the logo URL if found, or null if not found.
   */
  selectLogoByStoreID(storeID) {
    const sql = "SELECT logo FROM STORE WHERE storeID = ?";
    const params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves the background image associated with a store using its ID.
   *
   * @param {number} storeID - The ID of the store to retrieve the background image for.
   * @return {Promise<string|null>} A Promise that resolves with the background image URL if found, or null if not found.
   */
  selectBackgroundImageByStoreID(storeID) {
    const sql = "SELECT backgroundImage FROM STORE WHERE storeID = ?";
    const params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Updates the information of a store.
   *
   * @param {number} storeID - The ID of the store to update.
   * @param {string} storeName - The new name of the store.
   * @param {string} owner - The new owner of the store.
   * @param {string} telephone - The new telephone number of the store.
   * @param {string} email - The new email address of the store.
   * @param {number} zipID - The new ZIP code ID of the store's address.
   * @param {number} addressID - The new address ID of the store.
   * @return {Promise<boolean>} A Promise that resolves to true if the update was successful, or false otherwise.
   */
  updateStore(storeID, storeName, owner, telephone, email, zipID, addressID) {
    const sql = `
    UPDATE
        STORE
    SET
        storeName = ?,
        owner = ?,
        telephone = ?,
        email = ?,
        zipID = ?,
        addressID = ?
    WHERE
        storeID = ?;
    `;
    const params = [
      storeName,
      owner,
      telephone,
      email,
      zipID,
      addressID,
      storeID
    ];
    return this.database.updateTable(sql, params);
  }

  /**
   * Updates the information of an address.
   *
   * @param {number} addressID - The ID of the address to update.
   * @param {string} street - The new street name of the address.
   * @param {string} houseNumber - The new house number of the address.
   * @param {number} longitude - The new longitude of the address.
   * @param {number} latitude - The new latitude of the address.
   * @param {number} zipID - The new ZIP code ID of the address.
   * @return {Promise<boolean>} A Promise that resolves to true if the update was successful, or false otherwise.
   */
  updateAddress(addressID, street, houseNumber, longitude, latitude, zipID) {
    const sql = `
    UPDATE
        ADDRESS
    SET
        street = ?,
        houseNumber = ?,
        longitude = ?,
        latitude = ?,
        zipID = ?
    WHERE
        addressID = ?;
    `;
    const params = [street, houseNumber, longitude, latitude, zipID, addressID];
    return this.database.updateTable(sql, params);
  }

  /**
   * Updates the login credentials of a store by setting a new password for the given username.
   *
   * @param {string} username - The username of the store.
   * @param {string} password - The new password to set.
   * @return {Promise<boolean>} A Promise that resolves with a boolean indicating the success of the update.
   */
  updateLoginCredentials(username, password) {
    const sql = "UPDATE LOGINCREDENTIALS SET password = ? WHERE username = ?";
    const params = [password, username];
    return this.database.updateTable(sql, params);
  }

  /**
   * Updates a parameter for a store by store ID.
   *
   * @param {string} parameter - The parameter to update (e.g., "storeName", "owner").
   * @param {string} value - The new value for the parameter.
   * @param {number} storeID - The ID of the store to update.
   * @return {Promise<void>} A Promise that resolves when the update is complete.
   */
  updateParameter(parameter, value, storeID) {
    const sql = `UPDATE STORE SET ${parameter} = ? WHERE storeID = ?`;
    const params = [value, storeID];
    return this.database.updateTable(sql, params);
  }
}

module.exports = UserRepository;
