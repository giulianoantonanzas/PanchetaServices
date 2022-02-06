const { RequestHandler } = require("express");
const jwt = require("jsonwebtoken");

const authenticate = () => async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, process.env.SECRET);
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
      message: "Invalid token.",
      statusCode: 401,
    });
  }
};

export default authenticate;
