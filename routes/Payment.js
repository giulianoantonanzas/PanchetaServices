const express = require("express");
const paymentRoutes = express.Router();

paymentRoutes.post("/generatePayment", function (req, res) {
  const product = req.body.products;
  const userInfo = req.body.userInfo;
  return generatePayment(product, userInfo).then((data) =>
    res.json(data.response || data)
  );
});

module.exports = paymentRoutes
