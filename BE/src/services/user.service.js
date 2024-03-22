const { User } = require("../models");

exports.create = async (data) => User.create(data);

exports.findOneByEmail = async (email) => User.findOne({ email }).lean();

exports.findOneById = async (userId) => User.findById(userId);


exports.updateById = async (userId, data) =>
  User.findByIdAndUpdate(userId, data, { new: true });

exports.deleteById = async (userId) =>
  User.findByIdAndDelete(userId, { new: true });



exports.findFilter = async (data, select) => User.find(data).select(select);

