import { Schema } from "mongoose";

// Schema definition for a like object
const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { _id: false }
);

export { likeSchema };
