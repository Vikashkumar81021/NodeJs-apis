import mongoose from "mongoose";

const queueBasedTask = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const QueueBaesTask = mongoose.model("Queue", queueBasedTask);

export default QueueBaesTask;
