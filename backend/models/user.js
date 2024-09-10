import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      required: true,
      lowercase: true,
      trim: true,
    },

    lastName: {
      type: String,
      minLength: 2,
      required: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
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
      minLength: 8,
      trim: true,
    },

    created: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    updated: {
      type: Date,
      default: Date.now,
    },

    blogPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
      },
    ],

    interests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
  },
  { strict: true }
);

const User = model("User", userSchema);
export default User;
