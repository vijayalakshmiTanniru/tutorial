const express = require('express');
  const router = express.Router();
  const userController = require('../controllers/userController');
  const taskController = require('../controllers/taskController');

  // User Routes
  router.post('/signup', userController.signup);
  router.post('/login', userController.login);
  router.post('/logout', userController.logout);

  // Task Routes
  router.post('/tasks', taskController.createTask);
  router.get('/tasks', taskController.getTasksWithFilters); // Filtering & Sorting [cite: 9, 10]
  router.get('/tasks/user', taskController.getUserTasks); // Get user's tasks
  router.get('/tasks/admin', taskController.getAllTasks); // Get all tasks (admin)
  router.get('/tasks/:id', taskController.getTask);
  router.put('/tasks/:id', taskController.updateTask);
  router.delete('/tasks/:id', taskController.deleteTask);

  module.exports = router;
