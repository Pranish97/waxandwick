const express = require("express");
const {
  regsiterUser,
  loginUser,
} = require("../../controller/auth/authController");

const router = express.Router();

router.post("/register", regsiterUser);
router.post("/login", loginUser);

module.exports = router;
