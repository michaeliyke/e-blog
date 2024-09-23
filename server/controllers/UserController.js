import User from "../models/User.js";
import {
  checkPassword,
  generateHref,
  hashPassword,
  uploadImage,
} from "../utils/tools.js";
import { fakeUsers } from "../utils/FakeData.js";
import { createJwtToken } from "../utils/JwtUtils.js";
import Post from "../models/Post.js";
import axios from "axios";
import Comment from "../models/Comment.js";

export const postSaveUnsave = async (req, res) => {
  const userId = req.userId;
  const postId = req.query.postId;

  if (!postId) {
    return res.sendStatus(400);
  } else if (!(await Post.exists({ _id: postId }))) {
    return res.sendStatus(404);
  }

  try {
    const user = await User.findById(userId);
    const saved = user.saved.posts.includes(postId);
    if (saved) {
      user.saved.posts.pull(postId);
      user.saved.count--;
    } else {
      user.saved.posts.push(postId);
      user.saved.count++;
    }
    await user.save();
    return res.json({
      liked: !saved,
    });
  } catch (err) {
    console.dir(err);
    res.sendStatus(500);
  }
  return res.status(200).json({ message: "post found" });
};

export const getAuthInfo = async (req, res) => {
  // get a user by id
  // or 404 (not found) status if teh user is not found
  const userId = req.userId;
  const user = await User.findById(
    userId,
    "-_id firstname lastname profilePicture.thumbnail"
  ).exec();
  if (user) {
    if (!user.thumbnail) {
      user.thumbnail = "https://i.ibb.co/YBcH51t/no-pic.png";
    }
    return res.status(200).json({ user });
  }
  return res.status(404).json({ message: "User not found !" });
};

export const getUserProfile = async (req, res) => {
  // get a user by id
  // or 404 (not found) status if teh user is not found
  const userId = req.userId;
  const user = await User.findById(
    userId,
    "firstname lastname email profilePicture"
  ).exec();
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(404).json({ message: "User not found !" });
};

export const getUserPosts = async (req, res) => {
  const userId = req.userId;
  const pageNumber = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (pageNumber - 1) * limit;
  try {
    const user = await User.findById(
      userId,
      "posts firstname lastname href profilePicture.thumbnail saved -_id"
    )
      .populate({
        path: "posts",
        select:
          "_id title text user slug tags createdAt likes comments.count cover.medium",
        options: {
          sort: { createdAt: -1 },
          skip,
          limit,
        },
        populate: {
          path: "tags",
          select: "name",
        },
      })
      .exec();
    const data = await Promise.all(
      user.posts.map((post) => {
        const liked = post.likes.users.includes(userId);
        const saved = user.saved.posts.includes(post._id);
        return {
          blog: {
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              href: user.href,
              profilePicture: {
                thumbnail: user.profilePicture.thumbnail,
              },
            },
            comments: { count: post.comments.count },
            likes: { count: post.likes.count },
            cover: { medium: post.cover?.medium || undefined },
            _id: post._id,
            title: post.title,
            text: post.text.slice(0, 100),
            slug: post.slug,
            tags: post.tags,
            createdAt: post.createdAt,
            liked,
            saved,
          },
        };
      })
    );
    if (data.length === 0) return res.sendStatus(404);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
  return res.sendStatus(400);
};

export const loginUser = async (req, res) => {
  // login function
  const { email, password, checkBox } = req.body;

  if (!email || !password) {
    return res.status(401).json({ status: "credential(s) missing" });
  }

  try {
    // Later try using static method to validate user
    const user = await User.findOne({ email }, "password");
    if (!user) return res.status(403).json({ message: "Invalid user email" });
    if (!(await checkPassword(password, user.password)))
      return res.status(403).json({ message: "Invalid user password" });

    // return the JWT
    const token = await createJwtToken({ userId: user._id }, checkBox);
    res.cookie("_token", `Bearer ${token}`);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  // get all users
  const data = await User.find({}, "-password").exec();
  return res.status(200).json(data);
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  const user = await User.findById(id).exec();
  try {
    if (checkPassword(oldPassword, user.password)) {
      user.password = hashPassword(newPassword);
      user.save();
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
  return res.sendStatus(401);
};

export async function getUserInfo(req, res) {
  // get a user by id
  // or 404 (not found) status if teh user is not found
  const userId = req.query.userId;
  const slug = req.query.slug;
  if (userId) {
    const user = await User.findById(
      userId,
      "firstname lastname profilePicture.medium profilePicture.thumbnail"
    ).exec();
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json("User not found !");
  } else if (slug) {
    const user = await User.findOne(
      { href: slug },
      "firstname lastname href profilePicture.medium profilePicture.thumbnail"
    ).exec();
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json("User not found !");
  } else {
    return res.status(400).json({ message: "Query parameters invalide" });
  }
}

export const registerUser = async (req, res) => {
  // create a new user
  // if email already exists abort
  // if href already exists add an 8 chars id after id --> href-xxxxxxxx
  // Return teh created user
  const { firstname, lastname, email, password } = req.body;

  if (await User.exists({ email }).exec()) {
    return res.status(409).json({ status: "User already exists" });
  }

  // check if teh href (firstname, lastname) both already exists
  let href = `${firstname.toLowerCase().trim()}-${lastname
    .toLowerCase()
    .trim()}`;
  if (await User.exists({ href }).exec()) {
    href = await generateHref(href);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    firstname,
    lastname,
    href,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return res.status(201).json({ status: "user created" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMsgs = Object.values(err.errors).map((error) => error.message);
      return res
        .status(400)
        .json({ error: "Validation Error", messages: errorMsgs });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

export const createUsers = async (req, res) => {
  // create fake users
  console.log("create fake users ...");
  await Promise.all(
    fakeUsers.map(async (data) => {
      console.log(data);
      if (await User.exists({ email: data.email })) {
        return;
      }
      const newPost = new User(data);
      await newPost.save();
    })
  );
  return res.status(201).json({ status: "all fake users created" });
};

export const updateUser = async (req, res) => {
  // console.log("update user");
  const userId = req.userId;
  const { firstname, lastname, email } = req.body;
  const image = req.file;
  // console.dir({ firstname, lastname, email, image });
  const newData = {};
  if (firstname) newData.firstname = firstname;
  if (lastname) newData.lastname = lastname;
  if (email) newData.email = email;
  // console.dir(newData);

  try {
    const user = await User.findByIdAndUpdate(userId, newData, {
      runValidators: true,
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    await user.save();
    if (image) await uploadImage(image, user);
    return res.sendStatus(200);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (err.name === "ValidationError") {
      const errorMsgs = Object.values(err.errors).map((error) => error.message);
      return res
        .status(400)
        .json({ error: "Validation Error", messages: errorMsgs });
    }
    console.log(JSON.stringify(err));
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserPassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;

  if ((!oldPassword || !newPassword, !userId)) {
    return res
      .status(400)
      .json({ message: "Old and new password are required" });
  }

  try {
    const user = await User.findById(userId, "password").exec();
    if (!(await checkPassword(oldPassword, user.password)))
      return res.status(403).json({ message: "Invalid user password" });

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.save();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Password update failed" });
  }
};

export const getUserPublicPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const userId = req.params.userId;
  const authUserId = req.userId;
  let authUser;
  try {
    const { posts } = await User.findById(userId, "posts -_id").populate({
      path: "posts",
      select:
        "_id title user slug tags createdAt likes comments.count cover.medium",
      populate: {
        path: "tags",
        select: "name",
      },
    });
    if (authUserId) {
      authUser = await User.findById(authUserId, "saved.posts").lean();
    }
    // console.log(posts);
    const data = await Promise.all(
      posts.map(async (blog) => {
        const liked =
          authUserId &&
          blog.likes.users.some((user) => user.equals(authUserId));
        const saved = authUserId
          ? authUser.saved.posts.includes(blog._id)
          : false;
        const newBlog = blog.toObject();
        delete newBlog.likes.users;
        return {
          blog: { ...newBlog, liked, saved },
        };
      })
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getSavedPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const { saved } = await User.findById(userId, "saved").populate({
      path: "saved.posts",
      select:
        "_id title user slug tags createdAt likes comments.count cover.medium",
      populate: {
        path: "tags",
        select: "name",
      },
      populate: {
        path: "user",
        select: "firstname lastname href profilePicture.thumbnail -_id",
      },
    });
    const data = saved.posts.map((post) => {
      return { blog: post };
    });
    console.log(data);
    return res.json(data);
  } catch (err) {
    console.dir(err);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;
  const { password } = req.body;
  try {
    const user = await User.findById(userId).select("posts password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!(await checkPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Delete the user
    if (user.profilePicture.deleteUrl)
      axios.delete(user.profilePicture.deleteUrl);

    // Delete the posts
    if (user.posts.length > 0) {
      await Post.deleteMany({ _id: { $in: user.posts } });
      console.log("Posts deleted");
    } else {
      console.log("No posts to delete");
    }
    await Comment.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting user and posts:", error);
  }
  return res.sendStatus(400);
};
