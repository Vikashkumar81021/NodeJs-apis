import mongoose from "mongoose";

const urlShortnerSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const UrlShortner = mongoose.model("UrlShortner", urlShortnerSchema);

export default UrlShortner;
