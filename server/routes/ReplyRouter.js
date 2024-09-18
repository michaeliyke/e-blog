import { Router } from "express";
import { getLikes, likeUnlike } from "../controllers/LikeController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";
// import { getReply } from "../controllers/ReplyController.js";

const replyRouter = Router();

replyRouter.post("/:id/likes", isAuthenticated, likeUnlike);

replyRouter.get("/:id/likes", getLikes);

// replyRouter.get("/:replyId", getReply); // Test purpose only.

export default replyRouter;
