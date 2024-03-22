const express = require("express");
const {
  login,
  register,
} = require("../validations/auth.validation");
const { userController } = require("../controllers");
const { validate } = require("express-validation");
const {
  auth,
} = require("../middlewares/auth");
const router = express.Router();

router.post("/register", validate(register), userController.register);
router.post("/login", validate(login), userController.login);
router.get("/profile", auth, userController.getProfile);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update", auth, userController.updateUser);
router.post("/logout", userController.logout);

module.exports = router;
