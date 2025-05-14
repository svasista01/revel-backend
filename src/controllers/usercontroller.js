import { verifyGoogleToken } from "../services/googleAuthService.js";

export const completeUserProfile = async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const googleUser = await verifyGoogleToken(token);
    const { email, name } = googleUser;
    const { dob, tob, pob, phone } = req.body;

    // Log or save to DB
    console.log(`Saving profile for ${email}`);
    console.log({ name, dob, tob, pob, phone });

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("Error verifying Google token:", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};