const express = require("express");
const { removeImageById } = require("../controllers/productimage");
const productImageRoute = express.Router();

productImageRoute.delete("/remove/:id", (req, res) => {
  return removeImageById(req.params.id).then((data) => res.json(data));
});

module.exports = productImageRoute;
