const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const regsiterUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({
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

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Invalid Credentials!",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.json({
        message: "Invalid Credentials!",
        success: false,
        error: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "30m" }
    );

    res.cookie("token", token, { httpOnly: true, sexure: false }).json({
      message: "Login Successfully!",
      success: true,
      error: false,
      user: {
        email: user.email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout Successfully!",
    error: false,
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
      error: false,
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unauthorized User",
      error: false,
    });
  }
};

module.exports = { regsiterUser, loginUser, logoutUser, authMiddleware };
