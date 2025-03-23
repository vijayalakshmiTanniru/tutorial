const Task = require('../models/Task');

// Create Task
exports.createTask = [
    authenticate,
    authorize(['user', 'admin']),
    async (req, res) => {
        try {
            const task = new Task({ ...req.body, createdBy: req.user._id });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

// Get All Tasks (Admin)
exports.getAllTasks = [
    authenticate,
    authorize(['admin']),
    async (req, res) => {
        try {
            const tasks = await Task.find().populate('assignedUser', 'username');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

// Get User's Tasks
exports.getUserTasks = [
    authenticate,
    authorize(['user']),
    async (req, res) => {
        try {
            const tasks = await Task.find({ createdBy: req.user._id }).populate('assignedUser', 'username');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

// Get Task by ID
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedUser', 'username');
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Task
exports.updateTask = [
    authenticate,
    authorize(['user', 'admin']),
    async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // Authorization: Users can only update their own tasks [cite: 5]
            if (req.user.role === 'user' && task.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            // Admins cannot modify user tasks
            if (req.user.role === 'admin') {
                 return res.status(403).json({message: "Admins cannot modify user tasks"} )
            }

            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

// Delete Task
exports.deleteTask = [
    authenticate,
    authorize(['user', 'admin']),
    async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // Authorization: Users can only delete their own tasks, admins can delete any [cite: 5, 6, 7]
            if (req.user.role === 'user' && task.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            await Task.findByIdAndDelete(req.params.id);
            res.json({ message: "Task deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
