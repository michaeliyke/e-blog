import { Router } from "express";
import {
  allBlogs,
  getPageOfBlogs,
  getPostById,
  createNewPost,
  getPostBySlug,
  getTopTen,
  searchEngine,
  getTrendingPosts,
  deletePost,
} from "../controllers/PostController.js";
import { getLikes, likeUnlike } from "../controllers/LikeController.js";
import Post from "../models/Post.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";
import {
  getComments,
  makeComment,
  modComment,
} from "../controllers/CommentController.js";

import multer from "multer";
export const upload = multer({ storage: multer.memoryStorage() });

const postRouter = Router();

// get all blogs (just for testing)
postRouter.get("/", allBlogs);

// create fake posts
// postRouter.post("/create_db", createTestPosts);

// get a page of posts
postRouter.get("/page/:page", isAuthenticated, getPageOfBlogs);

postRouter.post("/new", isAuthenticated, upload.single("image"), createNewPost);

postRouter.get("/h/:slug", getPostBySlug);

// get post by its id
postRouter.get("/id/:id", getPostById);

postRouter.post("/:id/likes", isAuthenticated, likeUnlike);

postRouter.get("/:id/likes", getLikes);

// get comments on a post
postRouter.get("/:postId/comments", getComments);

// comment on a post
postRouter.post("/:postId/comments", isAuthenticated, makeComment);

// edit or delete a comment
postRouter.all("/:postId/comments/:commentId", isAuthenticated, modComment);

postRouter.get("/top-ten", getTopTen);
postRouter.get("/trending", isAuthenticated, getTrendingPosts);

postRouter.get("/search", searchEngine);

postRouter.delete("/:postId", isAuthenticated, deletePost);

// drop blogs collection
postRouter.delete("/", async (req, res) => {
  await Post.collection.drop();
  return res.status(200).json({ status: "posts collection droped" });
});

export default postRouter;
