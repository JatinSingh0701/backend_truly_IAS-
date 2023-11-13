const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = require("../utils/config.js");
const { validationResult } = require("express-validator");

// Signup function with added validation
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 422;
      console.log(error);
      return next(error);
    }

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "User created successfully",
      username: "exampleusername",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login function with detailed error handling
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const error = new Error("User doesn't exist, please sign up");
      error.statusCode = 404;
      return next(error);
    }

    const doMatch = await bcrypt.compare(req.body.password, user.password);

    if (doMatch) {
      const token = jwt.sign(
        {
          username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "12h" }
      );
      return res.status(200).json({
        message: "User logged in successfully",
        token,
        username: user.username,
      });
    }

    const error = new Error("Invalid password or email");
    error.statusCode = 401;
    return next(error);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
