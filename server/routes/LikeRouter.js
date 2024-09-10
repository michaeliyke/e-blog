import { Router } from "express";
import { likePost } from "../controllers/LikeController.js";

const likeRouter = Router();
likeRouter.post("/", likePost);

export default likeRouter;
