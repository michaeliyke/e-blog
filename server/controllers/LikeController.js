import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { Reply } from "../models/Reply.js";

export const likeUnlike = async (req, res) => {
  const userId = req.userId;

  const model = {
    "/blogs": Post,
    "/comments": Comment,
    "/replies": Reply,
  }[req.baseUrl];

  if (!model) {
    return res.status(400).json({ message: "No content type found!" });
  }

  const id = req.params.id;

  try {
    const content = await model.findById(id, "likes");
    if (!content)
      return res.status(404).json({
        message:
          model === Post
            ? "Blog not found"
            : model === Comment
            ? "Comment not found"
            : "Reply not found",
      });

    const alreadyLiked = content.likes.users.includes(userId);
    if (alreadyLiked) {
      content.likes.users.pull(userId);
      content.likes.count--;
    } else {
      content.likes.users.push(userId);
      content.likes.count++;
    }
    await content.save();
    return res.json({
      likes: content.likes.count,
      liked: !alreadyLiked,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLikes = async (req, res) => {
  const model = {
    "/blogs": Post,
    "/comments": Comment,
    "/replies": Reply,
  }[req.baseUrl];

  if (!model) {
    return res.status(400).json({ message: "No content type found!" });
  }

  const id = req.params.id;

  const skip = req.query.skip;
  const limit = req.query.limit;

  try {
    const content = await model
      .findById(id)
      .select("likes")
      .populate({
        path: "likes.users",
        select: "firstname lastname thumbnail href -_id",
        options: { limit: limit, skip: skip },
      })
      .lean();
    if (!content)
      return res.status(404).json({
        message:
          model === Post
            ? "Blog not found"
            : model === Comment
            ? "Comment not found"
            : "Reply not found",
      });
    return res.json({ users: content.likes.users, count: content.likes.count });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
