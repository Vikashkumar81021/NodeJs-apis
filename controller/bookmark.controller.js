import BookMark from "../model/bookmark.model.js";

const bookMark = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const isExistingPostBookmark = await BookMark.findOne({ postId, userId });
    if (isExistingPostBookmark) {
      await BookMark.deleteOne();
      return res.status(200).json({ message: "Bookmark removed" });
    }
    await BookMark.create({ postId, userId });
    return res.status(200).json({ message: "BookMark successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getBookMark = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const bookMarkPost = await BookMark.find({ postId, userId })
      .populate("postId")
      //   .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ Bookmark: bookMarkPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { bookMark, getBookMark };
