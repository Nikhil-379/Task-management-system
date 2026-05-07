const express = require("express");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// PROTECTED ROUTE
router.get("/protected", protect, (req, res) => {

  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


// ADMIN ROUTE
router.get("/admin", protect, adminOnly, (req, res) => {

  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;