const express = require("express");
const {
  regsiterUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controller/auth/authController");

const router = express.Router();

router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user,
    error: false,
  });
});

module.exports = router;
