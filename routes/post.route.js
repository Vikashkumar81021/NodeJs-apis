import express from "express";
import { createPost, getPost } from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/post", authMiddleware, createPost);
router.get("/post/:userId", getPost);
export default router;
