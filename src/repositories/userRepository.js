const AbstractRepository = require("./abstractRepository");
class UserRepository extends AbstractRepository {
  constructor(database) {
    super(database);
  }

  getPasswordByName(username) {
    let sql = "SELECT password FROM LOGINCREDENTIALS WHERE username = ?";
    let params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  addRegisterCode(code) {
    let sql = "INSERT INTO REGISTRATION_CODES (CODE) VALUES (?)";
    let params = [code];
    return this.database.updateTable(sql, params);
  }

  getRegisterCode(code) {
    let sql = "SELECT CODE FROM REGISTRATION_CODES WHERE CODE = ?";
    let params = [code];
    return this.database.queryOneDataSet(sql, params);
  }

  getStoreDataByUsername(username) {
    let sql = `
    SELECT
        storeID,
        storeName,
        owner,
        logo,
        telephone,
        email,
    FROM
        STORE
    WHERE
        username = ?;
    `;
    let params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  getExistingStore(storeName) {
    let sql = "SELECT storeName FROM STORE WHERE storeName = ?";
    let params = [storeName];
    return this.database.queryOneDataSet(sql, params);
  }

  storeDetails() {
    let sql = `
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

  insertLoginCredentials(username, password) {
    let sql = `
    INSERT INTO
        LOGINCREDENTIALS (username, password)
    VALUES
        (?, ?);
    `;
    let params = [username, password];
    return this.database.insertTuple(sql, params);
  }

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
    let sql = `
    INSERT INTO
        STORE (storeName, owner, logo, backgroundImage, telephone, email, zipID, addressID, username)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    let params = [
      storeName,
      owner,
      logo,
      backgroundImage,
      telephone,
      email,
      zipID,
      addressID,
      username,
    ];
    return this.database.queryWithoutResponse(sql, params);
  }

  insertAddress(street, houseNumber, longitude, latitude, zipID) {
    let sql = `
    INSERT INTO
        ADDRESS (street, houseNumber, longitude, latitude, zipID)
    VALUES
        (?, ?, ?, ?, ?);
    `;
    let params = [street, houseNumber, longitude, latitude, zipID];
    return this.database.insertTuple(sql, params);
  }

  selectUsernameByStoreID(storeID) {
    let sql = "SELECT username FROM STORE WHERE storeID = ?";
    let params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectPasswordByUsername(username) {
    let sql = "SELECT password FROM LOGINCREDENTIALS WHERE username = ?";
    let params = [username];
    return this.database.queryOneDataSet(sql, params);
  }

  selectStoreByStoreID(storeID) {
    let sql = "SELECT * FROM STORE WHERE storeID = ?";
    let params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectStoreID(storeName) {
    let sql = "SELECT storeID FROM STORE WHERE storeNAME = ?";
    let params = [storeName];
    return this.database.queryOneDataSet(sql, params);
  }

  selectAddressByAddressID(addressID) {
    let sql = "SELECT * FROM ADDRESS WHERE addressID = ?";
    let params = [addressID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectAddressIDByStoreID(storeID) {
    let sql = "SELECT addressID FROM STORE WHERE storeID = ?";
    let params = [storeID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectAddressID(street, houseNumber, zipID) {
    let sql = `
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
    let params = [street, houseNumber, zipID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectZIPByZipID(zipID) {
    let sql = "SELECT ZIP FROM ZIP WHERE zipID = ?";
    let params = [zipID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectZipID(zip) {
    let sql = "SELECT ZIPID FROM ZIP WHERE ZIP = ?";
    let params = [zip];
    return this.database.queryOneDataSet(sql, params);
  }
  selectLogoByStoreID(storeID) {
    let sql = "SELECT logo FROM STORE WHERE storeID = ?";
    let params = [storeID];
    return this.database.queryOneDataSet(sql, params);
    }

    selectBackgroundImageByStoreID(storeID) {
        let sql = "SELECT backgroundImage FROM STORE WHERE storeID = ?";
        let params = [storeID];
        return this.database.queryOneDataSet(sql, params);
    }

  updateStore(storeID, storeName, owner, telephone, email, zipID, addressID) {
    let sql = `
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
    let params = [
      storeName,
      owner,
      telephone,
      email,
      zipID,
      addressID,
      storeID,
    ];
    return this.database.updateTable(sql, params);
  }

  updateAddress(addressID, street, houseNumber, longitude, latitude, zipID) {
    let sql = `
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
    let params = [street, houseNumber, longitude, latitude, zipID, addressID];
    return this.database.updateTable(sql, params);
  }
  
  updateLoginCredentials(username, password) {
    let sql = "UPDATE LOGINCREDENTIALS SET password = ? WHERE username = ?";
    let params = [username, password];
    return this.database.updateTable(sql, params);
  }

  updateParameter(parameter, value, storeID) {
    let sql = `UPDATE STORE SET ${parameter} = ? WHERE storeID = ?`;
    let params = [value, storeID];
    return this.database.updateTable(sql, params);
  }
}

module.exports = UserRepository;
