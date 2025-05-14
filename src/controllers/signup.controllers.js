// src/controllers/signup.controller.js
import { createUserInAuth0 } from "../services/auth0.service.js";

export const signupController = async (req, res) => {
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

    return res.status(200).json({ message: "User created", user: result });

  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);

    if (error.response && error.response.status === 409) {
      // User already exists
      return res.status(409).json({ message: "User already exists." });
    }

    // For all other errors
    return res.status(400).json({ message: error.message || "Signup failed." });
  }
};