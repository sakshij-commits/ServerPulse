const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

// ✅ GET ALL USERS
router.get("/", async (req, res) => {

  try {

    const users = await User.find()
      .select("-password");

    res.json(users);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ✅ INVITE USER
router.post("/invite", async (req, res) => {

  try {

    const { email, role } = req.body;

    const exists = await User.findOne({
      email
    });

    if (exists) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // temporary password
    const tempPassword = "welcome123";

    const hashed = await bcrypt.hash(
      tempPassword,
      10
    );

    const name = email.split("@")[0];

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json({
      message: "User invited",
      tempPassword,
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ✅ CHANGE ROLE
router.put("/:id/role", async (req, res) => {

  try {

    const { role } = req.body;

    await User.findByIdAndUpdate(
      req.params.id,
      { role }
    );

    res.json({
      message: "Role updated"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ✅ DELETE USER
router.delete("/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User removed"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;