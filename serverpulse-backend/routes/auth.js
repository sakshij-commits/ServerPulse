const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// 🔐 PASSWORD RULE
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// CHANGE PASSWORD
router.put("/change-password", auth, async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Password must contain 8+ chars, uppercase, lowercase and number"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // 🔐 CHECK OLD PASSWORD
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Incorrect current password"
      });
    }

    // 🔐 HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // ✅ NAME VALIDATION
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        error:
          "Name must be at least 3 characters"
      });
    }

    // ✅ EMAIL VALIDATION
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Invalid email address"
      });
    }

    // ✅ PASSWORD VALIDATION
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain 8+ chars, uppercase, lowercase and number"
      });
    }

    // ✅ CHECK DUPLICATE EMAIL
    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered"
      });
    }

    // 🔐 HASH PASSWORD
    const hashed = await bcrypt.hash(
      password,
      10
    );

    // 👤 CREATE USER
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed
    });

    res.json({
      message: "User created"
    });

  } catch (err) {

    res.status(400).json({
      error: err.message
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // ✅ EMAIL VALIDATION
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Invalid email address"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    // 🔐 CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Wrong password"
      });
    }

    // 🔑 GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// UPDATE PROFILE
router.put("/update-profile", auth, async (req, res) => {

  try {

    const { name, email } = req.body;

    // ✅ VALIDATION
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        error:
          "Name must be at least 3 characters"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Invalid email address"
      });
    }

    const user = await User.findById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    user.name = name.trim();
    user.email = email.toLowerCase();

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// CURRENT USER
router.get("/me", auth, async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;