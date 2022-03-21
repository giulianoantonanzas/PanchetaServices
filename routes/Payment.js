const express = require("express");
const { generatePayment, getPayments } = require("../controllers/Payment");
const paymentRoutes = express.Router();

paymentRoutes.post("/generatePayment", function (req, res) {
  const { products, userInfo } = req.body;
  return generatePayment(products, userInfo).then((data) =>
    res.json(data.response || data)
  );
});

paymentRoutes.get("/", function (_, res) {
  return getPayments().then((data) => res.json(data));
});


module.exports = paymentRoutes;
