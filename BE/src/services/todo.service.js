const { Todo } = require("../models");

exports.create = async (data) => Todo.create(data);

exports.findOneById = async (todoId) => Todo.findById(todoId);

exports.findAll = async (f, q, k, l) => Todo.find(f).sort(q).skip(k).limit(l);

exports.deleteAllTodos = async () => Todo.deleteMany({});

exports.countDocuments = async () => Todo.countDocuments();

exports.updateById = async (todoId, data) =>
    Todo.findByIdAndUpdate(todoId, data, { new: true });

exports.deleteById = async (todoId) =>
    Todo.findByIdAndDelete(todoId, { new: true });

exports.insertMany = async (data) => Todo.insertMany(data, { new: true });

exports.getAllTodos = async () => Todo.find();

exports.findFilter = async (data, select) => Todo.find(data).select(select);

exports.findOneAndUpdate = async (data, update) =>
    Todo.findOneAndUpdate(data, update, { new: true });

exports.upsertData = async (filter, data) =>
    Todo.updateOne(filter, { $push: data });

exports.deleteDataFromArray = async (filter, data) =>
    Todo.updateOne(filter, { $pull: data });
