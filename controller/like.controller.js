import Like from "../model/like.model.js";
import Notification from "../model/notification.model.js";
import Post from "../model/post.model.js";

const postLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // const exisitingLike = await Like.findOne({ postId, userId });
    const exisitingLike = await Like.findOneAndDelete({ postId, userId });
    if (exisitingLike) {
      // await exisitingLike.deleteOne();
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "post unliked" });
    }
    await Like.create({
      postId,
      userId: req.user._id,
    });
    //Not optimal approach
    // post.likeCount += 1;
    // await post.save();
    await Post.findByIdAndUpdate(postId, {
      $inc: { likeCount: 1 },
    });
    //Notification api

    if (post.userId.toString() !== userId.toString()) {
      await Notification.create({
        receiverId: post.userId,
        senderId: userId,
        type: "like",
        postId: post._id,
        // message: `${req.user.userName} is like your post`,
      });
    }
    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const postDislike = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const likeId = await Like.findById(id);

//     return res.status(200).json({ messgae: "OK" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
export { postLike };
