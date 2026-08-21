import express from "express";
import { generateShowSeats } from "../controller/seat.controller.js";
const router = express.Router();

router.post("/generateSeats/:showId", generateShowSeats);
export default router;
