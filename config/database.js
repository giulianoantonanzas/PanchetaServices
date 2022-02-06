const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pancheta_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
