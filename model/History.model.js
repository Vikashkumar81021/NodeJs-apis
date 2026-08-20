import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actionType: {
      type: String,
    },
  },
  { timestamps: true },
);

const History = mongoose.model("History", historySchema);
export default History;
