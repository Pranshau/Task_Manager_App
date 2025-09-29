const Task = require("../model/Task");
const asynchHandler = require("../utils/asyncHandler");

// Create Task
exports.createTask = asynchHandler(async (req, res) => {
  const userId = req.user._id;
  const { title, description, status, dueDate } = req.body;

  if (!title) return res.status(400).json({ message: "Task title required" });

  const newTask = await Task.create({
    user: userId,
    title,
    description,
    status,
    dueDate,
  });
  res.status(201).json(newTask);
});

// Get Tasks
exports.getTasks = asynchHandler(async (req, res) => {
  const { search, status, page = 1, limit = 5 } = req.query;
  const query = req.user.role === "admin" ? {} : { user: req.user._id };

  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }

  const tasks = await Task.find(query)
    .populate("user", "username email")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Task.countDocuments(query);

  res.json({
    tasks,
    currentPage: Number(page),
    totalPages: Math.ceil(count / limit),
    totalTasks: count,
  });
});

// Update Task
exports.updateTask = asynchHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    req.user.role !== "admin" &&
    task.user.toString() !== req.user._id.toString()
  )
    return res.status(403).json({ message: "Forbidden" });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

// Delete Task
exports.deleteTask = asynchHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    req.user.role !== "admin" &&
    task.user.toString() !== req.user._id.toString()
  )
    return res.status(403).json({ message: "Forbidden" });

  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Optional
exports.deleteAnyTask = asynchHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted by admin" });
});
