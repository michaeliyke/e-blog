import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
  comments: [{ type: Schema.Types.ObjectId, required: true }],
  created: { type: Date, default: Date.now, immutable: true },
  updated: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

const Blog = model("Blog", blogSchema);
export default Blog;
