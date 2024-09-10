import { Schema, model } from "mongoose";

const replySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now, immutable: true },
  },
  { _id: false }
);

const Reply = model("Reply", replySchema);
export { replySchema, Reply };
