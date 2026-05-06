const express = require("express");
console.log("NEW TASK API SERVER RUNNING");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

let tasks = [];
let currentId = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// CREATE task
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTask = {
        id: currentId++,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created",
        task: newTask
    });
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = true;

    res.status(200).json({
        message: "Task updated",
        task
    });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});