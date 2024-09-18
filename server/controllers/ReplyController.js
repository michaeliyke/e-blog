import { Reply } from "../models/Reply.js";
import Comment from "../models/Comment.js";
import { startSession } from "mongoose";

export const replyToComment = async (req, res) => {
  const userId = req.userId;

  const commentId = req.params.commentId;
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ message: "Reply cannot be empty!" });
  }

  let session;
  try {
    session = await startSession();
    session.startTransaction();

    const comment = await Comment.findById(commentId, "replies").session(
      session
    );

    if (!comment) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Comment not found" });
    }

    const newReply = new Reply({ user: userId, text });

    comment.replies.push(newReply);

    await newReply.save({ session });
    await comment.save({ session });

    await session.commitTransaction();
    const reply = newReply.toObject();
    delete reply.user;
    return res.status(201).json({ reply });
  } catch (err) {
    session && (await session.abortTransaction());
    return res.sendStatus(500);
  } finally {
    session && session.endSession();
  }
};

export const modReply = async (req, res) => {
  const userId = req.userId;

  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const text = req.body.text;

  const { method } = req;
  if (!["PUT", "DELETE"].includes(method)) {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (method === "PUT" && !text)
    return res.status(400).json({ message: "Reply cannot be empty!" });

  let session;
  try {
    session = await startSession();
    session.startTransaction();
    const reply = await Reply.findOne({ user: userId, _id: replyId }).session(
      session
    );
    const comment =
      !!reply &&
      (await Comment.findOne({
        _id: commentId,
        replies: { $elemMatch: { _id: replyId } },
      }).exec());

    if (!comment) {
      await session.abortTransaction();
      return res.sendStatus(404);
    }

    if (method === "PUT") {
      if (reply.text !== text) {
        comment.replies.pull(reply);
        reply.text = text;
        comment.replies.push(reply);

        await reply.save({ session });
        await comment.save({ session });

        await session.commitTransaction();
        return res.json({ reply });
      }
      await session.abortTransaction();
      return res.json({ reply });
    }

    comment.replies.pull(reply);
    await comment.save({ session });
    await reply.deleteOne({ session });
    await session.commitTransaction();
    return res.json({ message: "successful" });
  } catch (err) {
    session && (await session.abortTransaction());
    return res.sendStatus(500);
  } finally {
    session && session.endSession();
  }
};

export const getReplies = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId, "replies -_id")
      .populate({
        path: "replies.user",
        select: "firstname lastname href profilePicture.thumbnail -_id",
      })
      .lean();
    console.log(comment.replies);
    if (!comment) return res.status(400).json({ message: "Invalid commentId" });
    return res.json({ replies: comment.replies });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

// // Test purpose only
// export const getReply = async (req, res) => {
//   const replyId = req.params.replyId;
//   const reply = await Reply.findById(replyId).exec();
//   return res.json(reply);
// };
