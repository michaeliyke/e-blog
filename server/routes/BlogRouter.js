import { Router } from "express";
import {
  allBlogs,
  createTestPosts,
  getPageOfBlogs,
  getPostById,
  // createBlog,
  // updateBlog,
} from "../controllers/BlogController.js";
import Post from "../models/blog.js";

const blogRouter = Router();

// get all blogs (just for testing)
blogRouter.get("/", allBlogs);

// create fake posts
blogRouter.post("/create_db", createTestPosts);

// get a page of posts
blogRouter.get("/page/:page", getPageOfBlogs);

// get post by its id
blogRouter.get("/:id", getPostById);

// drop blogs collection
blogRouter.delete("/", async (req, res) => {
  await Post.collection.drop();
  return res.status(200).json({ status: "posts collection droped" });
});

// blogRouter.post("/", createBlog);
// blogRouter.put("/:id", updateBlog);

export default blogRouter;
