require("dotenv").config();
class ConfigurationManager {
  constructor() {
    this.config = {};
  }

  loadConfig() {
    this.config = {
      database: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
      },
      jwt: {
        jwt_secret: process.env.JWT_SECRET,
      },
    };
  }

  get(key) {
    return this.config[key];
  }
}

module.exports = new ConfigurationManager();
