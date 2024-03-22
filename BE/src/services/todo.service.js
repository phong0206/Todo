const { Todo } = require("../models");

exports.create = async (data) => Todo.create(data);

exports.findOneById = async (todoId) => Todo.findById(todoId);

exports.updateById = async (todoId, data) =>
    Todo.findByIdAndUpdate(todoId, data, { new: true });

exports.deleteById = async (todoId) =>
    Todo.findByIdAndDelete(todoId, { new: true });

exports.getAllTodos = async () => Todo.find();

exports.findOneAndUpdate = async (data, update) =>
    Todo.findOneAndUpdate(data, update, { new: true });

