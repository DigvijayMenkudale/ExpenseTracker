// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hash });
//     res.status(201).json({ message: "User registered" });
//   } catch (err) {
//     res.status(400).json({ error: "Email already exists" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: "Invalid email" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//   const token = jwt.sign({ userId: user._id }, "secret123", {
//     expiresIn: "1h",
//   });
//   res.json({ token, message: "Login successful" });
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
});

module.exports = router;
