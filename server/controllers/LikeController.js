import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { Reply } from "../models/Reply.js";
// import User from "../models/User.js";

// export const likePost = async (req, res) => {
// const { postId, userId } = req.body;
// const post = await Post.findById(postId).exec();
// const user = await User.findById(userId).exec();

// if (!post || !user) {
//   return res.status(404).json({ status: "Not found" });
// }

// post.likes.push({ user });
// try {
//   await post.save();
// } catch (err) {
//   console.log(err);
//   return res.status(400).json({});
// }

// return res.status(200).json({ status: "DONE" });
// };

export const likeUnlike = async (req, res) => {
  const userId = req.userId;

  const postId = req.query.postId;
  const commentId = req.query.commentId;
  const replyId = req.query.replyId;

  let model;
  let id;

  if (postId) {
    model = Post;
    id = postId;
  } else if (commentId) {
    model = Comment;
    id = commentId;
  } else if (replyId) {
    model = Reply;
    id = replyId;
  } else {
    return res.status(400).json({ message: "No content tye found!" });
  }

  try {
    const content = await model.findById(id, "likes");
    if (!content)
      return res.status(404).json({
        message: postId
          ? "Blog not found"
          : commentId
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
      message: alreadyLiked ? "Unliked" : "Liked",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLikes = async (req, res) => {
  const postId = req.query.id;
  const commentId = req.query.commentId;
  const replyId = req.query.replyId;
  const skip = req.query.skip;
  const limit = req.query.limit;

  let model;
  let id;

  if (postId) {
    model = Post;
    id = postId;
  } else if (commentId) {
    model = Comment;
    id = commentId;
  } else if (replyId) {
    model = Reply;
    id = replyId;
  } else {
    return res.status(400).json({ message: "No content tye found!" });
  }

  try {
    const content = await model
      .findById(id)
      .select("likes")
      .populate({
        path: "likes.users",
        select: "firstname lastname thumbnail",
        options: { limit: limit, skip: skip },
      })
      .lean();
    if (!content)
      return res.status(404).json({
        message: postId
          ? "Blog not found"
          : commentId
          ? "Comment not found"
          : "Reply not found",
      });
    return res.json({ users: content.likes.users, count: content.likes.count });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
