import { Router } from "express";
import {
  allBlogs,
  createTestPosts,
  getPageOfBlogs,
  getPostById,
  // createBlog,
  // updateBlog,
} from "../controllers/PostController.js";
import Post from "../models/Post.js";

const postRouter = Router();

// get all blogs (just for testing)
postRouter.get("/", allBlogs);

// create fake posts
postRouter.post("/create_db", createTestPosts);

// get a page of posts
postRouter.get("/page/:page", getPageOfBlogs);

// get post by its id
postRouter.get("/:id", getPostById);

// drop blogs collection
postRouter.delete("/", async (req, res) => {
  await Post.collection.drop();
  return res.status(200).json({ status: "posts collection droped" });
});

// postRouter.post("/", createBlog);
// postRouter.put("/:id", updateBlog);

export default postRouter;
