import { Schema, model } from "mongoose";

const dbInfoSchema = new Schema({
  tagCount: { type: Number, default: 0 },
  userCount: { type: Number, default: 0 },
});

const dbInfo = model("dbInfo", dbInfoSchema);
export default dbInfo;
