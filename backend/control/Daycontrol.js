const mongoose = require('mongoose');
const Day = require('../schema/Daysschema.js');

const getDay = async (req, res) => {
    try {
        const foundDays = await Day.find({ 
            user: req.user.id, 
            day: req.params.day 
        });
        res.json(foundDays);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createDay = async (req, res) => {
    try {
        const { text, day } = req.body;

        if (!text || !day) {
            return res.status(400).json({ message: 'Text and day are required' });
        }

        const newDay = new Day({
            text,
            day,
            user: req.user.id,
        });

        const savedDay = await newDay.save();
        res.status(201).json(savedDay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- NEW FUNCTIONS ADDED BELOW ---

// @desc    Update a task (e.g., toggle completed status)
// @route   PUT /api/tasks/:id
// @access  Private
const updateDay = async (req, res) => {
    try {
        const task = await Day.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Security Check: Ensure the logged-in user owns this task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Toggle the 'completed' status and save the updated task
        task.completed = !task.completed;
        const updatedTask = await task.save();
        res.json(updatedTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteDay = async (req, res) => {
    try {
        const task = await Day.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Security Check: Ensure the logged-in user owns this task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getDay,
    createDay,
    updateDay, // Export the new function
    deleteDay,   // Export the new function
};
