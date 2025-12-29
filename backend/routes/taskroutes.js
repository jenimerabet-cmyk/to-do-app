const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskcontroller');
const authMiddleware = require('../middleware/authmiddleware');

// All routes are relative to /api/tasks
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
