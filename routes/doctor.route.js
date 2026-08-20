import express from "express";
import { createDoctor, getDoctor } from "../controller/doctor.controller.js";
const router = express.Router();
router.post("/create", createDoctor);
router.get("/current", getDoctor);
export default router;
