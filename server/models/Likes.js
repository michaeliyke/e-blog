import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { _id: false }
);

export { likeSchema };
