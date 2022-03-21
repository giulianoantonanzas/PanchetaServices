const express = require("express");
const {
  getAll,
  getAllByAdmin,
  create,
  remove,
  update,
  findById,
} = require("../controllers/Products");
const uploader = require("../middlewares/uploader");
const auth = require("../middlewares/auth");
const productRoutes = express.Router();
const url = require("url");

productRoutes.get("/", function (req, res) {
  const { page: currentPage, filter } = url.parse(req.url, true).query;
  return getAll(currentPage, filter).then((data) => res.json(data));
});

productRoutes.get("/admin", function (req, res) {
  const { page: currentPage, filter } = url.parse(req.url, true).query;
  return getAllByAdmin(currentPage, filter).then((data) => res.json(data));
});

productRoutes.get("/:id", function (req, res) {
  return findById(req.params.id).then((data) => res.json(data));
});

productRoutes.delete("/:id", auth, function (req, res) {
  return remove(req.params.id).then((data) => {
    res.status(data.code).send(data);
  });
});

productRoutes.post(
  "/",
  auth,
  uploader?.array("files", 10),
  function (req, res) {
    const files = req.files;
    return create(req.body, files).then((data) => res.json(data));
  }
);

productRoutes.put(
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

module.exports = productRoutes;
