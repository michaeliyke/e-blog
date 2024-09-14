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
        type: Schema.Types.ObjectId,
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
      original: { type: String },
      delete: { type: String },
    },
    thumbnail: { type: String, default: "https://i.ibb.co/YBcH51t/no-pic.png" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
