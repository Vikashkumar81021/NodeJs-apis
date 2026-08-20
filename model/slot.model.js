import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  capacity: {
    type: Number,
  },
});
const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
