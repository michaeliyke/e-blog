import mongoose from "../engine/db.js";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: [Number], default: [] },
    comments: { type: [String], default: [] },
    like: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
