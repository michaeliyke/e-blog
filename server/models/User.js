import { Schema, model } from "mongoose";

// user schema
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minLength: 2,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      minLength: 2,
      required: true,
      trim: true,
    },
    href: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: String,
        ref: "Post",
        required: true,
      },
    ],
    intrests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    paginationToken: { type: String },
    profilePicture: {
      thumbnail: {
        type: String,
        default: "https://i.ibb.co/YBcH51t/no-pic.png",
      },
      medium: {
        type: String,
        default: "https://i.ibb.co/HTt5cbr/no-pic.png",
      },
      image: {
        type: String,
        default: "https://i.ibb.co/whS5nPK/no-pic.png",
      },
      deleteUrl: { type: String },
    },
    saved: {
      posts: [{ type: String, ref: "Post", required: true }],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
