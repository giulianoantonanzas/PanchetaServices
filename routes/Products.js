const express = require("express");
const {
  getAll,
  create,
  remove,
  update,
  findById,
} = require("../controllers/Products");
const uploader = require("../middlewares/uploader");
const auth = require("../middlewares/auth");
const ProductRoutes = express.Router();
const url = require("url");

ProductRoutes.get("/", function (req, res) {
  const { page: currentPage, filter } = url.parse(req.url, true).query;
  return getAll(currentPage, filter).then((data) => res.json(data));
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
  uploader?.array("files", 10),
  function (req, res) {
    const files = req.files;
    return create(req.body, files).then((data) => res.json(data));
  }
);

ProductRoutes.put(
  "/:id",
  auth,
  uploader?.array("files", 10),
  function (req, res) {
    const files = req.files;
    return update(req.params.id, req.body, files).then((data) =>
      res.status(data.code).send(data)
    );
  }
);

module.exports = ProductRoutes;
