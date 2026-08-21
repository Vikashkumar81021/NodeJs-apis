import express from "express";
import {
  generateShowSeats,
  seatBookApi,
} from "../controller/seat.controller.js";
const router = express.Router();

router.post("/generateSeats/:showId", generateShowSeats);
router.patch("seatBook/:id", seatBookApi);
export default router;
