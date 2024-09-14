import { Schema, model } from "mongoose";
import { replySchema } from "./Reply.js";
import { likeSchema } from "./Likes.js";

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [replySchema],
    likes: {
      users: [likeSchema],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
