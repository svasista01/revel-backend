const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { signupRouter } = require("./src/routes/signup.route.js");
const { cityRouter } = require("./src/routes/city.route.js"); // <-- import new route

const app = express();

// ⭐ Setup CORS to allow frontend at 5173
app.use(cors({
  origin: "http://localhost:5173", // <-- allow only your Vite frontend
  credentials: true,
}));

// ⭐ Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⭐ Routes
app.use("/api/signup", signupRouter); // Signup routes
app.use("/api", cityRouter);           // <-- City routes for city search!

// ⭐ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Revel backend is up and running!");
});

// ⭐ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Revel backend server is running at http://localhost:${PORT}`);
});