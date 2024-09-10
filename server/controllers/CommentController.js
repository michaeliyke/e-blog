import Post from "../models/Post";

export const getCommentsOfPost = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).exec();
};
