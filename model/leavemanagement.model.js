import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    reason: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "reject"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
