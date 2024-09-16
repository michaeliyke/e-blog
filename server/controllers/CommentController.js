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
        populate: {
          path: "user",
          select: "firstname lastname email",
        },
        option: { limit: limit, skip: skip },
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

  let session;
  try {
    session = await startSession();
    let newComment;
    let commentsCount;
    await session.withTransaction(async () => {
      const post = await Post.findById(postId, "comments")
        .populate({
          path: "comments.ids",
          select: "user text",
        })
        .session(session);
      if (!post) {
        const error = new Error("Invalid postId");
        error.statusCode = 400;
        throw error;
      }
      const alreadyExixts = post.comments.ids.some(
        (comment) =>
          comment.user.toString() === userId &&
          comment.text === text &&
          comment._id === (newComment && newComment._id)
      );
      if (!alreadyExixts) {
        newComment = new Comment({ user: userId, text });
        await newComment.save({ session });
        post.comments.ids.push(newComment._id);
        post.comments.count++;
        await post.save({ session });
        commentsCount = post.comments.count;
      }
    });
    return res.status(201).json({ commentsCount, currentComment: newComment });
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
      if (comment && comment.user.toString() === userId) {
        if (method === "PUT") {
          if (comment.text !== req.body.text) {
            comment.text = req.body.text;
            await comment.save({ session });
          }
          return;
        }
        if (method === "DELETE") {
          const post = await Post.findById(postId, "comments").session(session);
          if (post && post.comments.ids.includes(comment._id)) {
            post.comments.ids.pull(comment._id);
            post.comments.count--;
            await post.save({ session });
            await comment.deleteOne({ session });
            return;
          }
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
    console.log(err);
    return res.status(500).json({ message: "server error" });
  } finally {
    session.endSession();
  }
};
