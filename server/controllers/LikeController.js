import Post from "../models/Post.js";
import User from "../models/User.js";

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  const post = await Post.findById(postId).exec();
  const user = await User.findById(userId).exec();

  if (!post || !user) {
    return res.status(404).json({ status: "Not found" });
  }

  post.likes.push({ user });
  try {
    await post.save();
  } catch (err) {
    console.log(err);
    return res.status(400).json({});
  }

  return res.status(200).json({ status: "DONE" });
};
