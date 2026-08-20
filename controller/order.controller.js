import Order from "../model/order.js";
import crypto from "node:crypto";
const createOrder = async (req, res) => {
  const { items } = req.body;
  try {
    const key = req.headers["idempotency-key"];
    if (!key) {
      return res.status(400).json({ message: "key is required" });
    }
    const bodyHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(req.body))
      .digest("hex");
    const order = await Order.findOne({ idempotencyKey: key });

    if (order) {
      if (order.bodyHash !== bodyHash) {
        return res.status(400).json({
          message: "Same key used with different data ❌",
        });
      }
      return res.json({
        message: "Order already created",
        data: order,
      });
    }
    await Order.create({
      orderId: Math.floor(Math.random() * 100000),
      items,
      idempotencyKey: key,
      bodyHash,
    });
    return res.status(200).json({ message: "order create successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { orderName, page = 1, limit = 10 } = req.query;

    // 1. Dynamic Filter Object Banao
    let filter = {};

    // Agar user ne orderName query me pass kiya hai tabhi filter me add karo
    if (orderName) {
      filter.orderName = { $regex: orderName, $options: "i" };
    }

    // 2. Query execute karo filter object ke saath
    const orders = await Order.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalOrders = await Order.countDocuments(filter);

    return res.status(200).json({
      totalOrders,
      currentPage: Number(page),
      totalPages: Math.ceil(totalOrders / limit),
      orders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

import mongoose from "mongoose";

export const cancelOrder = async (req, res) => {
  // 1. Transaction Session Start Karo
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    // 2. Query ke saath session pass karo
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Order not found" });
    }

    // 3. Ownership Check
    if (order.user.toString() !== userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this order" });
    }

    // 4. Status Check
    if (order.status === "CANCELLED" || order.status === "DELIVERED") {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({
          message: `Cannot cancel an order that is already ${order.status.toLowerCase()}`,
        });
    }

    // 5. Update Order Status
    order.status = "CANCELLED";
    await order.save({ session });

    // 6. Bulk Write Operation (Performance Optimization + Single Network Call)
    const bulkOperations = order.items.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { stock: item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOperations, { session });

    // 7. Sab kuch sahi rha toh Commit karo
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Order cancelled successfully",
      orderId: order._id,
      status: order.status,
    });
  } catch (error) {
    // Kisi bhi failure par Rollback!
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export default {
  createOrder,
};
