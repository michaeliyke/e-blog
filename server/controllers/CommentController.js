import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { startSession, Types } from "mongoose";

export const getComments = async (req, res) => {
  const postId = req.params.postId;
  const limit = req.query.limit;
  const skip = req.query.skip;

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
    if (!post) return res.status(400).json({ message: "Invalid postId" });
    return res.json({ comments: post.comments });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

export const makeComment = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const text = req.body.text;

  let session = null;
  try {
    session = await startSession();

    let commentCount;
    await session.withTransaction(async () => {
      const post = await Post.findById(postId, "comments").session(session);
      if (!post) {
        const error = new Error("Invalid postId");
        error.statusCode = 400;
        throw error;
      }

      const existingComment = post.comments.ids.some(
        (comment) => comment.user.toString() === userId && comment.text === text
      );
      if (!existingComment) {
        const comment = new Comment({ user: userId, text });
        await comment.save({ session });

        post.comments.ids.push(comment._id);
        post.comments.count++;
        await post.save({ session });
        commentCount = post.comments.count;
      }
    });

    return res.json({ count: commentCount, message: "successful" });
  } catch (err) {
    if (err.statusCode === 400)
      return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: "server error" });
  } finally {
    session.endSession();
  }
};

export const modComment = async (req, res) => {
  const userId = req.userId;

  const postId = req.params.postId;
  const commentId = req.params.commentId;

  const { method } = req;
  if (!["PUT", "DELETE"].includes(method)) {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  let session = null;
  try {
    session = await startSession();

    let comment;
    await session.withTransaction(async () => {
      comment = await Comment.findById(commentId, "user text").session(session);

      const duplicate = await Comment.findOne({
        text: req.body.text,
        user: Types.ObjectId(userId),
        _id: { $ne: Types.ObjectId(commentId) },
      }).session(session);

      if (!duplicate && comment && comment.user.toString() === userId) {
        if (req.method === "PUT") {
          comment.text = req.body.text;
          await comment.save({ session });
          return;
        }

        const post = await Post.findById(postId, "comments").session(session);
        if (post && post.comments.ids.includes(comment._id)) {
          post.comments.ids.pull(comment._id);
          post.comments.count--;
          await post.save({ session });
          await comment.deleteOne({ session });
          return;
        }
      }

      const error = new Error("Invalid request");
      error.statusCode = 400;
      throw error;
    });

    return req.method === "PUT"
      ? res.json({ comment })
      : res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    if (err.statusCode === 400)
      return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: "server error" });
  } finally {
    session.endSession();
  }
};
