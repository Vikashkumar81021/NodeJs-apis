import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
    },
    idempotencyKey: {
      type: String,
    },
    items: {
      type: [String],
    },
    bodyHash: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
