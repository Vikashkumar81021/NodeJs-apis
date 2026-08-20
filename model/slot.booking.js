import mongoose from "mongoose";

const slotBooking = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
  },
  status: {
    type: String,
    enum: ["Booked", "Cancel"],
  },
});

const SlotBook = mongoose.model("BookSloot", slotBooking);
export default SlotBook;
