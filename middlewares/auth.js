const jwt = require("jsonwebtoken");
const { jwtSECRET } = require("../constants");

const authenticate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, jwtSECRET);
      req.headers.authorization = JSON.stringify(decodedToken);
      next();
      return true;
    } else {
      res.status(403).send({
        message: "Unauthorized.",
        statusCode: 403,
      });
      return false
    }
  } catch (err) {
    res.status(401).send({
      message: "Invalid token.",
      statusCode: 401,
    });
    return false
  }
};

module.exports = authenticate

