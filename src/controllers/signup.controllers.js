// src/controllers/signup.controller.js
const { createUserInAuth0 } = require("../services/auth0.service.js");

const signupController = async (req, res) => {
  try {
    console.log("🧪 Inside signupController");

    const { firstName, lastName, contact, dob, city, time } = req.body;
    console.log("🧾 Form Data Received:", { firstName, lastName, contact, dob, city, time });

    if (!contact || !dob || !city || !time || !firstName || !lastName) {
      console.warn("⚠️ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await createUserInAuth0({
      firstName,
      lastName,
      contact,
      dob,
      city,
      time,
    });

    console.log("✅ User created:", result);

    res.status(200).json({ message: "User created", user: result });
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  signupController,
};