import { json } from "express";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import { fakeUsers, fakeBlogs } from "../utils/FakeData.js";
import {
  getNextTagId,
  getTrendingPage,
  stringToSlug,
  unify,
  uploadToImgBB,
} from "../utils/tools.js";
import { verifyToken } from "../utils/JwtUtils.js";

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
    let user;

    const blogsList = await Post.find(
      {},
      "_id title text user slug tags createdAt likes comments.count cover.medium"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "firstname lastname href profilePicture -_id")
      .populate("tags", "name")
      .exec();
    if (userId) {
      user = await User.findById(userId, "saved.posts").lean();
    }
    const data = await Promise.all(
      blogsList.map(async (blog) => {
        // console.dir(blog.likes.users);
        const liked = userId ? blog.likes.users.includes(userId) : false;
        const saved = userId ? user.saved.posts.includes(blog._id) : false;
        const newBlog = blog.toObject();
        newBlog.text = newBlog.text.slice(0, 100);
        delete newBlog.likes.users;
        return {
          blog: { ...newBlog, liked, saved },
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
  const { title, text } = req.body;
  const image = req.file;
  // console.dir(image);
  const tags = JSON.parse(req.body.tags);
  if (!title || !text || !tags) {
    return res.status(400).json({ message: "Not enough data" });
  }

  for (const tag of tags) {
    const newTag = unify(tag);
    currentTag = await Tag.findOne({ name: newTag }).exec();
    if (currentTag) {
      tagList.push(currentTag._id);
      tagObjects.push(currentTag);
    } else {
      const _id = await getNextTagId();
      currentTag = await Tag({ name: newTag, _id });
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
    for (const tag of tagObjects) {
      tag.count++;
      tag.save();
    }
    if (image) {
      const imageData = await uploadToImgBB(image);
      post.cover = { ...imageData };
      // await uploadCover(image, post);
    }
    await post.save();
    const user = await User.findById(userId, "posts");
    user.posts.push(post._id);
    user.save();
    return res.status(200).json({ post });
  } catch (err) {
    const statusCode = err.status || 500;
    console.log(err);
    return res.sendStatus(statusCode);
  }
};

export const getPostBySlug = async (req, res) => {
  const slug = req.params.slug;
  let user = null;
  if (!slug) return res.sendStatus(404);
  const token = req.cookies._token;
  if (token && token.startsWith("Bearer ")) {
    const { userId } = await verifyToken(token.slice(7));
    try {
      user = await User.findById(userId, "saved.posts").lean();
    } catch {}
  }

  const post = await Post.findOne(
    { slug },
    "user title text slug tags cover.image likes comments.count"
  )
    .populate("user", "firstname lastname href profilePicture.thumbnail -_id")
    .populate("tags", "name")
    .lean();
  const liked = user
    ? post.likes.users.some((likedUserId) => likedUserId.equals(user._id))
    : false;
  const saved = user ? user.saved.posts.includes(post._id) : false;
  const data = {
    post: {
      user: {
        firstname: post.user.firstname,
        lastname: post.user.lastname,
        href: post.user.href,
        profilePicture: {
          thumbnail: post.user.profilePicture.thumbnail,
        },
      },
      comments: { count: post.comments.count },
      likes: { count: post.likes.count },
      cover: { image: post.cover?.image || undefined },
      _id: post._id,
      title: post.title,
      text: post.text,
      slug: post.slug,
      tags: post.tags,
      liked,
      saved,
    },
  };
  return res.json(data);
};

export const getTopTen = async (req, res) => {
  const fields = {
    _id: 0,
    title: 1,
    slug: 1,
  };
  const topPosts = await getTrendingPage(1, fields);
  return res.json({ topPosts });
};

export const searchEngine = async (req, res) => {
  const searchText = req.query.text || "";
  const keywords = searchText.trim().split(/\s+/);

  const query = {
    $and: keywords.map((keyword) => ({
      title: { $regex: keyword, $options: "i" },
    })),
  };

  const posts = await Post.find(query, "title slug")
    .sort({ "likes.count": -1 })
    .limit(10)
    .lean();

  return res.json(posts);
};

export const getTrendingPosts = async (req, res) => {
  const pageNumber = parseInt(req.query.page) || 1;
  const userId = req.userId;
  let user;
  const lookups = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
  ];
  const fields = {
    title: 1,
    slug: 1,
    text: { $substrCP: ["$text", 0, 100] },
    "user.firstname": 1,
    "user.lastname": 1,
    "user.href": 1,
    "user.profilePicture.thumbnail": 1,
    "tags._id": 1,
    "tags.name": 1,
    createdAt: 1,
    "likes.count": 1,
    "likes.users": 1,
    "comments.count": 1,
    "cover.medium": 1,
  };
  try {
    const topPosts = await getTrendingPage(pageNumber, fields, lookups);
    if (userId) {
      user = await User.findById(userId, "saved.posts").lean();
    }
    const data = await Promise.all(
      topPosts.map((post) => {
        const liked = userId
          ? post.likes.users.some((user) => user.equals(userId))
          : false;
        const saved = userId ? user.saved.posts.includes(post._id) : false;
        return {
          blog: {
            user: {
              firstname: post.user.firstname,
              lastname: post.user.lastname,
              href: post.user.href,
              profilePicture: {
                thumbnail: post.user.profilePicture.thumbnail,
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
    return res.json(data);
  } catch (err) {
    console.dir(err);
    return res.sendStatus(400);
  }
};

export const deletePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  if (!postId) return res.status(400).json({ message: "Post ID is required" });
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { allBlogs, createTestPosts, getPageOfBlogs, getPostById };
