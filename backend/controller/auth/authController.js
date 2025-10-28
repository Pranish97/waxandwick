const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const regsiterUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User with this email already Exists!",
        error: true,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    newUser.save();

    res.status(200).json({
      message: "User Registered Successfully!",
      success: true,
      error: false,
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.find(email);

    if (!user) {
      res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = { regsiterUser, loginUser };
