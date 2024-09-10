import mongoose from "../engine/db.js";

// user schema
const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    href: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: { type: [String], default: [] },
    intrests: { type: [Number], default: [] },
    paginationToken: { type: String },
    profilePicture: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
