const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { jwtSECRET } = require("../constants");

/**
 * @param {{username:string, password:string}} body
 */
const create = async (body) => {
  try {
    body.password = md5(body.password);
    body.token = jwt.sign(body, jwtSECRET);
    return db.User.create(body);
  } catch (e) {
    return e;
  }
};

/**
 * @param {{username:string, password:string}} body
 */
const login = async (body) => {
  try {
    body.password = md5(body.password);
    return db.User.findOne({
      where: {
        ...body,
      },
    });
  } catch (e) {
    return e;
  }
};

module.exports = {
  create,
  login,
};
