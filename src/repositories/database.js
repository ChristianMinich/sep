require("dotenv").config();
const mariadb = require("mariadb");

/**
 * Represents a database connection manager using MariaDB.
 */
class Database {
  /**
   * Creates an instance of the Database class and initializes the connection pool.
   */
  constructor() {
    console.log("Initializing database connection pool...");
    console.log("host: " + process.env.host
    + " user: " + process.env.user
    + " password: " + process.env.password
    + " database: " + process.env.database
    + " connectionLimit: " + process.env.connectionLimit);
    this.pool = mariadb.createPool({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      connectionLimit: 50
    });
  }

  /**
   * Asynchronously acquires a connection from the pool.
   * @return {Promise<mariadb.PoolConnection>} A promise that resolves with a database connection.
   * @throws {Error} If there is an error while acquiring a connection.
   */
  async getConnection() {
    try {
      const connection = await this.pool.getConnection();
      return connection;
    } catch (err) {
      console.error("Failed to get database connection:", err);
      throw err;
    }
  }
}

/**
 * The Database instance that manages the database connection pool.
 * @type {Database}
 */
module.exports = new Database();
