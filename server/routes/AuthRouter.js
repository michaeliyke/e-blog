import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAuthInfo,
} from "../controllers/UserController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";

const authRouter = Router();

// create a new user
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

// this route gets user info using the jwt token
authRouter.get("/@me", isAuthenticated, getAuthInfo);

export default authRouter;
