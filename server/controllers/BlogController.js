import Post from "../models/blog.js";
import User from "../models/user.js";
import { fakeUsers, fakeBlogs } from "../utils/FakeData.js";

async function allBlogs(req, res) {
  // get all blogs
  const data = await Post.find({}).select("title _id text userId ");
  return res.status(200).json(data);
}

async function getPostById(req, res) {
  // get a post by its id
  const id = req.params.id;
  // console.log(req.query);
  const post = await Post.findById(id, "_id title text createdAt").exec();
  if (!post) {
    return res.status(404).json({ status: "post not found" });
  }
  return res.status(200).json(post);
}

async function getPageOfBlogs(req, res) {
  // gets a page of 10 posts
  try {
    const pageNumber = parseInt(req.params.page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const blogsList = await Post.find({}, "_id title text userId createdAt")
      .skip(skip)
      .limit(limit)
      .exec();
    // console.log(blogsList);
    const data = await Promise.all(
      blogsList.map(async (blog) => {
        const user = await User.findById(
          blog.userId,
          "firstname lastname thumbnail href -_id"
        ).exec();
        return { blog, user };
        // console.log({ blog, user });
      })
    );
    // console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
  res.status(400).json({});
}

async function createTestPosts(req, res) {
  // create fake Posts
  const arrayLength = fakeUsers.length;
  try {
    const postCreationPromises = fakeBlogs.map(async (data) => {
      if (await Post.findOne({ title: data.title })) {
        return; // Skip if post already exists
      }
      const userData = fakeUsers[Math.floor(Math.random() * arrayLength)];
      const user = await User.findOne({ email: userData.email }).exec();
      if (!user) {
        throw new Error();
      }
      const newPost = new Post({ ...data, userId: user._id });
      await newPost.save();
    });
    await Promise.all(postCreationPromises);
    return res.status(201).json({ status: "all fake posts created" });
  } catch (err) {
    return res.status(404).json({
      status:
        "a fake user is missing, make sure you create it or all of them !",
    });
  }
}

export { allBlogs, createTestPosts, getPageOfBlogs, getPostById };
