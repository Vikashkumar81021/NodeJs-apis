import mongoose from "mongoose";

const timeTrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  clockIn: {
    type: Date,
  },
  clockOut: {
    type: Date,
  },
  totalHourWork: {
    type: Number,
    default: 9,
  },
  date: {
    type: Date,
  },
});

const TimeTrack = mongoose.model("TimeTrack", timeTrackSchema);
export default TimeTrack;
