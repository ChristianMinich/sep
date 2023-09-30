const AbstractRepository = require("./abstractRepository");

/**
 * Represents a base repository for database operations.
 * @extends AbstractRepository
 */
class BaseRepository extends AbstractRepository {
  /**
   * Creates an instance of BaseRepository.
   * @param {Database} database - The database connection.
   */
  constructor(database) {
    super(database);
  }

  /**
   * Execute a SQL query with parameters and return a promise.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<any>} A promise that resolves with the query result.
   */
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.database
        .getConnection()
        .then((conn) => {
          conn
            .query(sql, params)
            .then((result) => {
              conn.release();
              resolve(result);
            })
            .catch((error) => {
              console.log(error);
              conn.release();
              reject(error);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  /**
   * Execute a SQL query and return the first result set as a single object or false if no results are found.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<any>} A promise that resolves with the first result or false.
   */
  queryOneDataSet(sql, params) {
    return this.query(sql, params).then((result) =>
      result.length !== 0 ? result[0] : false
    );
  }

  /**
   * Execute a SQL query and return all result sets as an array or false if no results are found.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<any>} A promise that resolves with all results or false.
   */
  queryAllData(sql, params) {
    return this.query(sql, params).then((result) =>
      result.length !== 0 ? result : false
    );
  }

  /**
   * Execute a SQL query and return a boolean indicating whether the query had any effect.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<boolean>} A promise that resolves with a boolean indicating whether the query had any effect.
   */
  queryWithoutResponse(sql, params) {
    return this.query(sql, params).then((result) => !!result);
  }

  /**
   * Execute a SQL query and return a boolean indicating whether the table was updated.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<boolean>} A promise that resolves with a boolean indicating whether the table was updated.
   */
  updateTable(sql, params) {
    return this.query(sql, params).then((result) => result.affectedRows > 0);
  }

  /**
   * Execute a SQL query and return a boolean indicating whether a tuple was inserted.
   * @param {string} sql - The SQL query.
   * @param {Array} params - The parameters for the query.
   * @return {Promise<boolean>} A promise that resolves with a boolean indicating whether a tuple was inserted.
   */
  insertTuple(sql, params) {
    return this.query(sql, params).then((result) => result.affectedRows > 0);
  }
}

module.exports = BaseRepository;
