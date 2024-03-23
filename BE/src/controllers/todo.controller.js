const { todoService } = require("../services");
const apiResponse = require("../dtos/apiResponse");

const addTodo = async (req, res) => {
    const data = { ...req.body };
    const userId = req.id;
    console.log(userId)

    try {
        const newTodo = await todoService.create({ userId: userId, ...data, status: "pending" });

        return apiResponse.successResponseWithData(res, 'Add Todo successfully', newTodo);
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const getAllTodos = async (req, res) => {
    const userId = req.id;
    const status = req.body.status;
    console.log(status)
    try {
        let allTodos
        if ((status == "pending") || (status == "completed")) {
            allTodos = await todoService.getAllTodosWithFilter(userId, status);
        } else {
            allTodos = await todoService.getAllTodos(userId);
        }
        return apiResponse.successResponseWithData(res, 'Get All Todo successfully', allTodos);
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const updateTodo = async (req, res) => {
    const { todoId } = req.params;
    const data = { ...req.body };
    try {

        const todo = await todoService.findOneById(todoId)
        if (!todo) return apiResponse.notFoundResponse(res, "Todo not found");
        if (todo.status === "completed") return apiResponse.ErrorResponse(res, "Todo completed can not edit")
        const newTodo = await todoService.updateById(todoId, data);
        return apiResponse.successResponseWithData(res, 'Update Todo successfully', newTodo);
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const deleteTodo = async (req, res) => {
    const userId = req.id;
    const { todoId } = req.params;
    try {
        const todo = await todoService.findOneById(todoId)
        if (!todo) return apiResponse.notFoundResponse(res, "Todo not found");
        await todoService.deleteById(todoId);
        return apiResponse.successResponse(res, 'Delete Todo successfully');
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const markTodo = async (req, res) => {
    const { todoId } = req.params;
    try {
        const todo = await todoService.findOneById(todoId)
        if (!todo) return apiResponse.notFoundResponse(res, "Todo not found");
        if (todo.status === 'pending') {
            await todoService.updateById(todoId, { status: "completed" });
        } else if (todo.status === 'completed') {
            await todoService.updateById(todoId, { status: "pending" });
        }
        return apiResponse.successResponse(res, 'Mark Todo successfully');
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};
module.exports = {
    addTodo, getAllTodos, updateTodo, deleteTodo, markTodo
};