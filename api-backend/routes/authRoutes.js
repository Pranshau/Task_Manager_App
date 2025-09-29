const express = require("express");
const {
  signup,
  userLogin,
  getCurrentUser,
} = require("../controller/auth.controler");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/signup", signup);

router.post("/login", userLogin);

router.post("/signup", auth, roleMiddleware("admin"), signup);

router.post("/verifytoken", auth, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Get current user
router.get("/me", auth, getCurrentUser);

module.exports = router;
