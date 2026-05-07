const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardData = async (req, res) => {

  try {

    // TOTAL PROJECTS
    const totalProjects = await Project.countDocuments();

    // TOTAL TASKS
    const totalTasks = await Task.countDocuments();

    // COMPLETED TASKS
    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    // PENDING TASKS
    const pendingTasks = await Task.countDocuments({
      status: {
        $in: ["pending", "in-progress"],
      },
    });

    // OVERDUE TASKS
    const overdueTasks = await Task.countDocuments({
      dueDate: {
        $lt: new Date(),
      },
      status: {
        $ne: "completed",
      },
    });

    // RESPONSE
    res.status(200).json({

      totalProjects,

      totalTasks,

      completedTasks,

      pendingTasks,

      overdueTasks,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};