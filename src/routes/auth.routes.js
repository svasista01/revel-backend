// src/routes/auth.routes.js
import express from "express";
import {
  startGoogleAuth,
  handleGoogleCallback,
  loginWithIdToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", startGoogleAuth); // browser-initiated login
router.get("/google/callback", handleGoogleCallback); // Google redirect
router.post("/google/token", loginWithIdToken); // Postman/JS token-based login

export default router;