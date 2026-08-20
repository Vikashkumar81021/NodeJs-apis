import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import HistoryLogs from "../controller/History.controller.js";

const router = express.Router();

router.post("/history", authMiddleware, HistoryLogs);

export default router;
