import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("post", postSchema);
export default Post;
