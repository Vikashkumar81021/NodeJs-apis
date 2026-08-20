import Post from "../model/post.model.js";

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    await Post.create({
      title,
      description,
      userId: req.user._id,
    });
    return res.status(201).json({ message: "post succesfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId }).populate("userId", "name email");

    if (!posts) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { createPost, getPost };
