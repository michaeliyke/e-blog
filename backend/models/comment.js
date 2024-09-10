import { Schema, model } from "mongoose";
import { replySchema } from "./reply";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  blogPost: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  text: { type: String, required: true },
  replies: { type: [replySchema], required: true },
  created: { type: Date, default: Date.now, immutable: true },
  updated: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

const Comment = model("Comment", commentSchema);
export default Comment;
