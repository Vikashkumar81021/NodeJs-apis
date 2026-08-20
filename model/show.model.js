import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },

    showDate: {
      type: String,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

const showModel = mongoose.model("Show", showSchema);

export default showModel;
