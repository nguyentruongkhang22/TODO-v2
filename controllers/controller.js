const Task = require('../models/taskModel');

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
        res.redirect('http://localhost:3000/');
    } catch (error) {
        setTimeout(() => {
            res.redirect('http://localhost:3000/');
        }, 3000);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({ title: req.params.title });
        await res.redirect('http://localhost:3000/');
    } catch (error) {
        await console.log('hiih');
        await res.redirect('http://localhost:3000/');
    }
};

exports.updateTask = async (req, res) => {
    try {
        console.log(req.body);
        await Task.findOneAndUpdate({ title: req.params.title }, req.body, {
            new: true,
            runValidators: true,
        });
        await res.status(200).redirect('http://localhost:3000/');
    } catch (error) {
        await res.redirect('http://localhost:3000/');
    }
};
