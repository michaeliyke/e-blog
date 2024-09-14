import { Schema, model } from "mongoose";
import dbInfo from "./DbInfo.js";

const tagSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Tag = model("Tag", tagSchema);
export default Tag;
