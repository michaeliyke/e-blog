import { Schema, model } from "mongoose";
import { likeSchema } from "./Likes.js";
import { v4 as uuidv4 } from "uuid";

const postSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    slug: { type: String, required: true },
    tags: [
      {
        type: Number,
        ref: "Tag",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      users: [likeSchema],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
