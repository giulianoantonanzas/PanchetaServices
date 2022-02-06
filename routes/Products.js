const express = require("express");
const {
  getAll,
  create,
  remove,
  update,
  findById,
} = require("../controllers/Products");
const uploader = require("../middlewares/uploader");

const ProductRoutes = express.Router();

ProductRoutes.get("/", function (req, res) {
  return getAll().then((data) => res.json(data));
});

ProductRoutes.get("/:id", function (req, res) {
  return findById(req.params.id).then((data) => res.json(data));
});

ProductRoutes.delete("/:id", function (req, res) {
  return remove(req.params.id).then((data) => {
    res.status(data.code).send(data);
  });
});

ProductRoutes.post(
  "/file",
  uploader.array("files", 10),
  function (req, res, next) {
    const files = req.files;
    const createdProduct = create(req.body, files).then((data) =>
      res.json(data)
    );

    return createdProduct;
  }
);

ProductRoutes.post("/", function (req, res) {
  return create(req.body).then((data) => res.json(data));
});

ProductRoutes.put("/", function (req, res) {
  return update(req.body).then((data) => res.json(data));
});

module.exports = ProductRoutes;
