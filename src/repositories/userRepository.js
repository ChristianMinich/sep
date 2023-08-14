import AbstractRepository from "./abstractRepository.js";
class UserRepository extends AbstractRepository{
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

  getExistingStore(storeName){
    let sql = "SELECT storeName FROM STORE WHERE storeName = ?";
    let params = [storeName];
    return this.database.queryOneDataSet(sql, params);
}

  // ... Other methods ...

  // Add the rest of your functions as methods of the class

  updatePassword(username, password) {
    let sql = "UPDATE LOGINCREDENTIALS SET password = ? WHERE username = ?";
    let params = [password, username];
    return this.database.updateTable(sql, params);
  }
}

module.exports = UserRepository;
