import express from "express";
import { createSlot, getAllSlots } from "../controller/slot.controller.js";

const router = express.Router();

router.post("/slot", createSlot);
router.get("/", getAllSlots);

export default router;
