const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("pancheta_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //logging: console.log,
});
