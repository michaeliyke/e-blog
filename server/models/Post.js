import { Schema, model } from "mongoose";
import { likeSchema } from "./Likes.js";

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [likeSchema],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
