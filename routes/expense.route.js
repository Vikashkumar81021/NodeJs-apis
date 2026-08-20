import express from "express";
import {
  createExpense,
  fetchExpense,
  softDelete,
  summaryExpense,
} from "../controller/expense.controller.js";

const router = express.Router();

router.post("/create", createExpense);
router.get("/fetchExpense", fetchExpense);
router.delete("/softDelete", softDelete);
router.get("/summary", summaryExpense);
export default router;
