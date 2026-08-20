import { redirectUrl, urlShort } from "../controller/url.shortner.js";
import express from "express";

const router = express.Router();
router.post("/urlShort", urlShort);
router.get("/:shortCode", redirectUrl);

export default router;
