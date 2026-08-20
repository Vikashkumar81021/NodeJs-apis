import express from "express";
import { clockIN, clockOUT } from "../controller/timeTrac.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/in", authMiddleware, clockIN);
router.post("/out", authMiddleware, clockOUT);

export default router;
