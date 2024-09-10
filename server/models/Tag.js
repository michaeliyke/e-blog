import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    _id: {type: Number, },
    name: { type: String, required: true },
  },
);

const Tag = model("Tag", tagSchema);
export { tagSchema, Tag };
