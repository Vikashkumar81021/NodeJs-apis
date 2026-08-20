import express from "express";
import {
  createProduct,
  getAllProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProduct);

export default router;
