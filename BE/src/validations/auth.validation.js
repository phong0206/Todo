const { Joi } = require("express-validation");
const SORT_BY_USER = [
  "name:desc",
  "name:asc",
  "age:desc",
  "age:asc",
  "createdAt:desc",
  "createdAt:asc",
];

exports.register = {
  body: Joi.object().keys({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    phonenumber: Joi.string(),
    age: Joi.number().min(6).max(20),
  }),
};
