import express from "express";
import { bookMark, getBookMark } from "../controller/bookmark.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/bookmark/:postId", authMiddleware, bookMark);
router.get("/bookmark/:postId", authMiddleware, getBookMark);

export default router;
