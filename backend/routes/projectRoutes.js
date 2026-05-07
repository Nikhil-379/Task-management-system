const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ADMIN CREATE PROJECT
router.post("/", protect, adminOnly, createProject);


// GET ALL PROJECTS
router.get("/", protect, getProjects);

module.exports = router;