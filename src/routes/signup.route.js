// src/routes/signup.route.js
const express = require("express");
const { signupController } = require("../controllers/signup.controllers.js");

const signupRouter = express.Router();

// POST /api/signup
signupRouter.post("/", async (req, res, next) => {
  console.log("📥 Received POST /api/signup");
  try {
    await signupController(req, res, next);
  } catch (error) {
    console.error("❌ Error during signup:", error.message);
    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: "User already exists." });
    }
    return res.status(400).json({ message: error.message || "Signup failed." });
  }
});

module.exports = {
  signupRouter,
};