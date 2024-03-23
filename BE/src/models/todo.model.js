const mongoose = require("mongoose");
const validator = require("validator");

const Todo = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide password"],
            default: "admin123",
        },
        description: {
            type: String,
            required: [true, "Please provide name"],
            name: "admin",
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
        userId: { type: mongoose.Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    }
);
Todo.statics.protectedFields = ["_id", "__v"];

module.exports = mongoose.model("Todo", Todo);
