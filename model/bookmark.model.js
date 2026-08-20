import mongoose from "mongoose";

const bookMarkSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

bookMarkSchema.index({ userId: 1, postId: 1 }, { unique: true });
const BookMark = mongoose.model("BookMark", bookMarkSchema);
export default BookMark;
