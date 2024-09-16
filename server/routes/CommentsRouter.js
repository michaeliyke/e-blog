import { Router } from "express";
import { getLikes, likeUnlike } from "../controllers/LikeController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";

const commentRouter = Router();

commentRouter.post("/:id/likes", isAuthenticated, likeUnlike);

commentRouter.get("/:id/likes", getLikes);

export default commentRouter;
