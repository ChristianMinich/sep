require("dotenv").config();
const mariadb = require("mariadb");

class Database {
    constructor() {
        this.pool = mariadb.createPool({
            host: "127.0.0.1", // process.env.host
            user: "sep23", // process.env.user
            password: "lingenliefert", // process.env.password
            database: "LINGENLIEFERT", // process.env.database
            connectionLimit: 50
        });
    }

    async getConnection() {
        try {
            const connection = await this.pool.getConnection();
            return connection;
        }
        catch (err) {
            console.error("Failed to get database connection:", err);
            throw err;
        }
    }
}

module.exports = new Database();
