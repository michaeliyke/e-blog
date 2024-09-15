import { Router } from "express";
import {
  allBlogs,
  createTestPosts,
  getPageOfBlogs,
  getPostById,
  createNewPost,
  getPostBySlug,
  // createBlog,
  // updateBlog,
} from "../controllers/PostController.js";
import { likeUnlike } from "../controllers/LikeController.js";
import Post from "../models/Post.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";
import {
  getComments,
  makeComment,
  modComment,
} from "../controllers/CommentController.js";

const postRouter = Router();

// get all blogs (just for testing)
postRouter.get("/", allBlogs);

// create fake posts
// postRouter.post("/create_db", createTestPosts);

// get a page of posts
postRouter.get("/page/:page", isAuthenticated, getPageOfBlogs);

postRouter.post("/new", isAuthenticated, createNewPost);

postRouter.get("/h/:slug", getPostBySlug);

// get post by its id
postRouter.get("/id/:id", getPostById);

postRouter.post("/likes", isAuthenticated, likeUnlike);

// get comments on a post
postRouter.get("/:postId/comments", getComments);

// comment on a post
postRouter.post("/:postId/comments", isAuthenticated, makeComment);

// edit or delete a comment
postRouter.all("/:postId/comments/:commentId", isAuthenticated, modComment);

// drop blogs collection
postRouter.delete("/", async (req, res) => {
  await Post.collection.drop();
  return res.status(200).json({ status: "posts collection droped" });
});

// postRouter.post("/", createBlog);
// postRouter.put("/:id", updateBlog);

export default postRouter;
