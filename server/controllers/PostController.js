import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import { fakeUsers, fakeBlogs } from "../utils/FakeData.js";
import { getNextTagId, stringToSlug } from "../utils/tools.js";

async function allBlogs(req, res) {
  // get all blogs
  const data = await Post.find({}).select("title _id text userId ");
  return res.status(200).json(data);
}

async function getPostById(req, res) {
  // get a post by its id
  const id = req.params.id;
  const post = await Post.findById(id, "_id title text createdAt").exec();
  if (!post) {
    return res.status(404).json({ status: "post not found" });
  }
  return res.status(200).json(post);
}

async function getPageOfBlogs(req, res) {
  // gets a page of 10 posts
  const userId = req.userId;
  try {
    const pageNumber = parseInt(req.params.page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const blogsList = await Post.find(
      {},
      "_id title text user slug tags createdAt likes comments.count"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "firstname lastname href profilePicture -_id")
      .populate("tags", "name")
      .exec();
    let data;
    data = await Promise.all(
      blogsList.map(async (blog) => {
        const liked = userId ? blog.likes.users.includes(userId) : false;
        const newBlog = blog.toObject();
        delete newBlog.likes.users;
        return {
          blog: { ...newBlog, liked },
        };
      })
    );
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
      const newPost = new Post({ ...data, user: user });
      await newPost.save();
    });
    await Promise.all(postCreationPromises);
    return res.status(201).json({ status: "all fake posts created" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status:
        "a fake user is missing, make sure you create it or all of them !",
    });
  }
}

export const createNewPost = async (req, res) => {
  const userId = req.userId;
  let currentTag;
  const tagList = [];
  const tagObjects = [];
  const { title, text, tags, image } = req.body;
  if (!title || !text || !tags) {
    return res.status(400).json({ message: "Not enough data" });
  }

  for (const tag of tags) {
    currentTag = await Tag.findOne({ name: tag }).exec();
    if (currentTag) {
      tagList.push(currentTag._id);
      tagObjects.push(currentTag);
    } else {
      const _id = await getNextTagId();
      currentTag = await Tag({ name: tag, _id });
      await currentTag.save();
      tagList.push(currentTag._id);
      tagObjects.push(currentTag);
    }
  }
  try {
    const post = new Post({
      title,
      text,
      user: userId,
      tags: tagList,
      slug: stringToSlug(title),
    });
    await post.save();
    for (const tag of tagObjects) {
      tag.count++;
      tag.save();
    }
    return res.status(200).json({ post });
  } catch (err) {
    const statusCode = err.status || 500;
    return res.sendStatus(statusCode);
  }
};

export const getPostBySlug = async (req, res) => {
  const slug = req.params.slug;
  if (!slug) return res.sendStatus(404);

  const post = await Post.findOne({ slug }, "user title text tags")
    .populate("user", "firstname lastname href profilePicture.thumbnail -_id")
    .populate("tags", "name")
    .exec();
  return res.json({ post });
};

export { allBlogs, createTestPosts, getPageOfBlogs, getPostById };
