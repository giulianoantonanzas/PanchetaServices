"use strict";
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { jwtSECRET } = require("../constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "pancheta",
          password: md5("1234"),
          createdAt: new Date(),
          updatedAt: new Date(),
          token: jwt.sign(
            {
              username: "pancheta",
              password: md5("1234"),
            },
            jwtSECRET
          ),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
