const express = require("express");
const { getAll, create, remove } = require("../controllers/Products");

const ProductRoutes = express.Router();

ProductRoutes.get("/", function (req, res) {
  return getAll().then((data) => res.json(data));
});

// DELETE
ProductRoutes.delete("/", function (req, res) {
  return remove(req.body.id).then((data) => data);
});

ProductRoutes.post("/", function (req, res) {
  return create(req.body).then((data) => res.json(data));
});
ProductRoutes.put("/", function () {
  console.log("Actualizando...");
});

module.exports = ProductRoutes;
