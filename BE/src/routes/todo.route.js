const express = require("express");
const { todoController } = require("../controllers");
const {
    auth,
} = require("../middlewares/auth");
const router = express.Router();

router.post("/add-todo", auth, todoController.addTodo);
router.post("/get-all-todos", auth, todoController.getAllTodos);
router.post("/update-todo/:todoId", auth, todoController.updateTodo);
router.delete("/delete-todo/:todoId", auth, todoController.deleteTodo);
router.get("/mark-todo/:todoId", auth, todoController.markTodo);

module.exports = router;
