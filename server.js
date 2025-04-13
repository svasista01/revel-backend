const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { signupRouter } = require("./src/routes/signup.route.js");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/signup", signupRouter);

app.get("/", (req, res) => {
  res.send("✅ Revel backend is up and running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Revel backend server is running at http://localhost:${PORT}`);
});