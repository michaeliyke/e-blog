import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Schema definition for a blog post object
const postSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    slug: { type: String, required: true },
    tags: [{ type: Number, ref: "Tag" }],
    comments: {
      ids: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      count: { type: Number, default: 0 },
    },
    likes: {
      users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      count: { type: Number, default: 0 },
    },
    cover: {
      thumbnail: { type: String },
      medium: { type: String },
      image: { type: String },
      deleteUrl: { type: String },
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
