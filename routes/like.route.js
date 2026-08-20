import express from "express";
import { postLike } from "../controller/like.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/like/:postId", authMiddleware, postLike);
// router.delete("/like/:id", authMiddleware, postDislike);

export default router;
