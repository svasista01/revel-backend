// src/routes/city.route.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { GOOGLE_PLACES_AUTOCOMPLETE_URL } from "../constants/apiConfig.js";

dotenv.config();

const router = express.Router();

// GET /api/search-cities?query=your_text
router.get("/search-cities", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const url = `${GOOGLE_PLACES_AUTOCOMPLETE_URL}?input=${encodeURIComponent(query)}&types=(cities)&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      return res.status(400).json({ message: "Google API error", status: response.data.status });
    }

    const cities = response.data.predictions.map(prediction => prediction.description);
    const uniqueCities = Array.from(new Set(cities)).sort();

    res.json({ cities: uniqueCities });
  } catch (error) {
    console.error("Backend error fetching cities:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;