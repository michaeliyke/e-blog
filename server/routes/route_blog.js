import { Router } from "express";
import {
  allBlogs,
  createBlog,
  updateBlog
} from "../controllers/control_blog.js"

const blogRouter = Router();
blogRouter.get('/', allBlogs);
blogRouter.post('/', createBlog);
blogRouter.get('/:id', getBlog);
blogRouter.put('/:id', updateBlog);

export default blogRouter;
