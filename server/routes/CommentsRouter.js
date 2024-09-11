import { Router } from "express";
import { getCommentsOfPost } from "../controllers/CommentController.js";
import Post from "../models/Post.js";

const commentRouter = Router();

// // get all blogs (just for testing)
// commentRouter.get("/", allBlogs);

// // create fake posts
// commentRouter.post("/create_db", createTestPosts);

// // get a page of posts
commentRouter.get("/:postId", getCommentsOfPost);

// // get post by its id
// commentRouter.get("/:id", getPostById);

// drop blogs collection
commentRouter.delete("/", async (req, res) => {
  await Post.collection.drop();
  return res.status(200).json({ status: "posts collection droped" });
});

// commentRouter.post("/", createBlog);
// commentRouter.put("/:id", updateBlog);

export default commentRouter;
