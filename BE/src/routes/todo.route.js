const express = require("express");
const {
    addTodo
} = require("../validations/auth.validation");
const { todoController } = require("../controllers");
const { validate } = require("express-validation");
const {
    auth,
} = require("../middlewares/auth");
const router = express.Router();

router.post("/add-todo", validate(addTodo), todoController.addTodo);
router.post("/get-all-todos", todoController.getAllTodos);
router.get("/update-todo", auth, todoController.updateTodo);
router.delete("/delete-todo/:id", todoController.deleteTodo);
router.put("/mark-todo", auth, todoController.markTodo);

module.exports = router;
