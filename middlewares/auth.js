const jwt = require("jsonwebtoken");
const { jwtSECRET } = require("../constants");

const authenticate = async (req, res, next) => {
  try {
    if (req.headers) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, jwtSECRET);
      req.headers.authorization = JSON.stringify(decodedToken);
      next();
    } else {
      res.status(403).send({
        message: "Unauthorized.",
        statusCode: 403,
      });
    }
  } catch (err) {
    res.status(401).send({
      message: err,
      statusCode: 401,
    });
  }
};

module.exports = authenticate;
