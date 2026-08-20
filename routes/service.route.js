import express from "express";
import { service, getService } from "../controller/service.controller.js";

const router = express.Router();

router.post("/", service);
router.get("/services", getService);

export default router;
