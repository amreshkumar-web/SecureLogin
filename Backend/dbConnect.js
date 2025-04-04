const { Sequelize } = require("sequelize");
require("dotenv").config()
const sequelize = new Sequelize("secureLogin", "root", process.env.DATABASE_SECRET_KEY, {
  host: "localhost",
  dialect: "mariadb",
  logging: false, // Set to true to log SQL queries
});

sequelize.authenticate()
  .then(() => console.log("✅ Connected to MariaDB"))
  .catch(err => console.error("❌ Connection error:", err));

module.exports = sequelize;