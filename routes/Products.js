const express = require("express");
const { getAll, create, remove, update } = require("../controllers/Products");

const ProductRoutes = express.Router();

ProductRoutes.get("/", function (req, res) {
  return getAll().then((data) => res.json(data));
});

ProductRoutes.delete("/", function (req, res) {
  return remove(req.body.id).then((data) => {
    res.status(data.code).send(data);
  });
});

ProductRoutes.post("/", function (req, res) {
  return create(req.body).then((data) => res.json(data));
});

ProductRoutes.put("/", function (req, res) {
  return update(req.body).then((data) => res.json(data));
});

module.exports = ProductRoutes;
