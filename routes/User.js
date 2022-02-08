const express = require("express");
const { create, login } = require("../controllers/User");
const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
    return login(req.body).then(response => res.json(response))
});


userRouter.post("/register", (req, res) => {
    return create(req.body).then(response => res.json(response))
});

module.exports = userRouter;