// Get Tasks with Filtering and Sorting
exports.getTasksWithFilters = [
    authenticate,
    async (req, res) => {
        try {
            let filter = {};
            if (req.query.assignedUser) filter.assignedUser = req.query.assignedUser;
            if (req.query.priority) filter.priority = req.query.priority;
            if (req.query.status) filter.status = req.query.status;

            let sort = {};
            if (req.query.sortBy === 'priority') sort.priority = req.query.sortOrder === 'desc' ? -1 : 1;
            if (req.query.sortBy === 'dueDate') sort.dueDate = req.query.sortOrder === 'desc' ? -1 : 1;
            if (req.query.sortBy === 'status') sort.status = req.query.sortOrder === 'desc' ? -1 : 1;

            const tasks = await Task.find(filter).sort(sort).populate('assignedUser', 'username');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
