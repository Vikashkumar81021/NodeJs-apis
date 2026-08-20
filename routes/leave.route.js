import express from "express";
import { approvedLeave, TakeLeave } from "../controller/leave.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/leave", authMiddleware, TakeLeave);
router.patch("/leave/:id", approvedLeave);

export default router;
