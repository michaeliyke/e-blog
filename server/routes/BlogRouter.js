import { Router } from "express";
import {
  allBlogs,
  createTestPosts,
  // createBlog,
  // updateBlog,
} from "../controllers/control_blog.js";

const blogRouter = Router();
// get all blogs (just for testing)
blogRouter.get("/", allBlogs);
// get 20 fake blogs (just for testing)
blogRouter.get("/test", createTestPosts);

// blogRouter.post("/", createBlog);
// blogRouter.get("/:id", getBlog);
// blogRouter.put("/:id", updateBlog);

export default blogRouter;
