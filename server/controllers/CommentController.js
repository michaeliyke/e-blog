import Post from "../models/Post";

export const getCommentsOfPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId)
      .select("comments")
      .populate({
        path: "comments.ids",
        option: { limit: limit, skip: skip },
      })
      .populate({
        path: "comments.ids.user",
        select: "firstname lastname email",
      })
      .lean();
  } catch (err) {}
};
