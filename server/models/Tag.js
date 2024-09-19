import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const Tag = model("Tag", tagSchema);
export default Tag;
