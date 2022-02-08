const express = require("express");
const {
  getAll,
  create,
  remove,
  update,
  findById,
} = require("../controllers/Products");
const uploader = require("../middlewares/uploader");
const auth = require('../middlewares/auth')
const ProductRoutes = express.Router();
const url = require('url');

ProductRoutes.get("/", function (req, res) {
  const { page: currentPage } = url.parse(req.url, true).query
  return getAll(currentPage).then((data) => res.json(data));
});

ProductRoutes.get("/:id", function (req, res) {
  return findById(req.params.id).then((data) => res.json(data));
});

ProductRoutes.delete("/:id", auth, function (req, res) {
  return remove(req.params.id).then((data) => {
    res.status(data.code).send(data);
  });
});

ProductRoutes.post(
  "/",
  auth,
  uploader.array("files", 10),
  function (req, res, next) {
    const files = req.files;
    return create(req.body, files).then((data) =>
      res.json(data)
    );
  }
);

ProductRoutes.put("/", auth, function (req, res) {
  return update(req.body).then((data) => res.json(data));
});

module.exports = ProductRoutes;
