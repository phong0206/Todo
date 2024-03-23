const express = require("express");
const userRoute = require("./user.route");
const todoRoute = require("./todo.route");
const router = express.Router();

router.use("/user/auth", userRoute);
router.use("/todo", todoRoute);

module.exports = router;
