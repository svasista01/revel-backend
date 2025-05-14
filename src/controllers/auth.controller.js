// src/controllers/auth.controller.js
import { getGoogleTokens, authenticateUserWithGoogle } from "../services/auth.service.js";
import { OAuth2Client } from "google-auth-library";

export const startGoogleAuth = (req, res) => {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
  res.redirect(url);
};

export const handleGoogleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await getGoogleTokens(code);
    const user = await authenticateUserWithGoogle(tokens.id_token);

    // Redirect to frontend with email or JWT
    res.redirect(`${process.env.FRONTEND_SUCCESS_REDIRECT}?email=${user.email}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth callback failed");
  }
};

export const loginWithIdToken = async (req, res) => {
  try {
    const { id_token } = req.body;
    const user = await authenticateUserWithGoogle(id_token);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};