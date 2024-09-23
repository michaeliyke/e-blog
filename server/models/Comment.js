import { Schema, model } from "mongoose";
import { Reply } from "./Reply.js";

// Schema defining the properties of a comment object.
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply", required: true }],
    likes: {
      users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
