const Task = require('../models/taskModel');
const url = 'http://localhost:3000/';
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                tasks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.addNewTask = async (req, res) => {
    try {
        const newTask = {
            title: req.body.title,
            description: req.body.desc,
        };
        const task = await Task.create(newTask);
        res.redirect(url);
    } catch (error) {
        setTimeout(() => {
            res.redirect(url);
        }, 3000);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        await res.redirect(url);
    } catch (error) {
        await res.redirect(url);
    }
};

exports.updateTask = async (req, res) => {
    try {
        console.log(req.body);
        await Task.findOneAndUpdate({ id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        await res.status(200).redirect(url);
    } catch (error) {
        await res.redirect(url);
    }
};
