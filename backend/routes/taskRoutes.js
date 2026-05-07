const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", protect, adminOnly, createTask);


// GET TASKS
router.get("/", protect, getTasks);


// UPDATE STATUS
router.put("/:id", protect, updateTaskStatus);

module.exports = router;