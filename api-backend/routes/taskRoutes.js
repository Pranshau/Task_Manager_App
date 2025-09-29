const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteAnyTask,
} = require("../controller/task.controller");
const auth = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", auth, getTasks);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

router.post("/", auth, createTask);

// Admin-only
router.delete("/:id/admin", auth, roleMiddleware("admin"), deleteAnyTask);

module.exports = router;
