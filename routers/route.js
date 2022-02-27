const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.route('/').post(controller.addNewTask);
router.route('/api/v1/task/:id').delete(controller.deleteTask).patch(controller.updateTask);

router.get('/api/v1/data', controller.getAllTasks);

module.exports = router;
