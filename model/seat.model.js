import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

const seatModel = mongoose.model("Seat", seatSchema);

export default seatModel;
