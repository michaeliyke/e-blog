import { Router } from "express";
import { getLikes, likeUnlike } from "../controllers/LikeController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";
import {
  replyToComment,
  modReply,
  getReplies,
} from "../controllers/ReplyController.js";
import { getComment } from "../controllers/CommentController.js";

const commentRouter = Router();

commentRouter.post("/:id/likes", isAuthenticated, likeUnlike);

commentRouter.get("/:id/likes", getLikes);

commentRouter.post("/:commentId/replies", isAuthenticated, replyToComment);

commentRouter.all("/:commentId/replies/:replyId", isAuthenticated, modReply);

commentRouter.get("/:commentId/replies", getReplies);

// commentRouter.get("/:id", getComment); // Test purpose only.

export default commentRouter;
