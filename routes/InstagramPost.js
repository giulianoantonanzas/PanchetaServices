const express = require("express");
const InstagramRoutes = express.Router();
const { getInstagramPostList, saveInstagramPost, removeInstagramPost } = require("../controllers/Instagram");
const auth = require("../middlewares/auth");

InstagramRoutes.get("/", function (req, res) {
  return getInstagramPostList().then((data) => res.json(data));
});

InstagramRoutes.post("/", auth, function (req, res) {
  return saveInstagramPost(req.body).then((data) => res.json(data));
});

InstagramRoutes.delete("/:id", auth, function (req, res) {
  return removeInstagramPost(req.params.id).then((data) => res.json(data));
});

module.exports = InstagramRoutes;
