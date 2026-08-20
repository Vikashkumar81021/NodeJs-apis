import express from "express";
import { createSeat } from "../controller/show.controller.js";

const router = express.Router();
router.post("/createSeat", createSeat);
export default router;
