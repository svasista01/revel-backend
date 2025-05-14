import express from "express";
//import { completeUserProfile } from "../controllers/userController.js";
import { completeUserProfile } from "../controllers/usercontroller.js";

const router = express.Router();

// POST /api/users/complete-profile
router.post("/complete-profile", completeUserProfile);

export default router;