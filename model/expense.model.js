import mongoose from "mongoose";

const expenseModel = new mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    expenseDate: {
      type: String,
    },
    isDelets: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseModel);
export default Expense;
