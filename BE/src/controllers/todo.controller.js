const { todoService } = require("../services");
const apiResponse = require("../dtos/apiResponse");
const { get } = require("../routes/user.route");

const addTodo = async (req, res) => {
    const data = { ...req.body };
    const userId = req.id;

    try {
        const newTodo = await todoService.create({ userId: userId, ...data, status: "pending" });

        return apiResponse.successResponseWithData(res, 'Add Todo successfully', newTodo);
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const getAllTodos = async (req, res) => {
    try {
        const allTodos = await todoService.getAllTodos()

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
        await todoService.deleteById(userId);

        return apiResponse.successResponse(res, 'Add Todo successfully');
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const markTodo = async (req, res) => {
    const { todoId } = req.params;
    const { status } = req.body;
    try {
        const todo = await todoService.findOneById(todoId)
        if (!todo) return apiResponse.notFoundResponse(res, "Todo not found");
        if (status === 'pending') {
            const newTodo = await todoService.updateById(todoId, { status: "completed" });
        } else if (status === 'completed') {
            const newTodo = await todoService.updateById(todoId, { status: "pending" });
        }
        return apiResponse.successResponseWithData(res, 'Mark Todo successfully', newTodo);
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};
module.exports = {
    addTodo, getAllTodos, updateTodo, deleteTodo, markTodo
};