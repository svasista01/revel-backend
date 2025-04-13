// src/routes/signup.route.js
const express = require("express");
const { signupController } = require("../controllers/signup.controllers.js");

const signupRouter = express.Router();

// POST /api/signup
signupRouter.post("/", (req, res, next) => {
  console.log("📥 Received POST /api/signup");
  return signupController(req, res, next);
});

module.exports = {
  signupRouter,
};