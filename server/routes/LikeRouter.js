import { Router } from "express";
import { getLikes, likeUnlike } from "../controllers/LikeController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";

const likeRouter = Router();

// likeRouter.post("/", isAuthenticated, likeUnlike);
likeRouter.get("/", getLikes);

export default likeRouter;
