const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    dueDate: {
        type: Date,
    },
});

const Task = mongoose.model('Task', taskScheme);

module.exports = Task;
