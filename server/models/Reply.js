import { Schema, model } from "mongoose";
import { likeSchema } from "./Likes.js";

const replySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: {
      // users: [likeSchema],
      users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Reply = model("Reply", replySchema);
export { replySchema, Reply };
