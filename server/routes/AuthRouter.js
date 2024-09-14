import { Router } from "express";
import { registerUser, loginUser } from "../controllers/UserController.js";

const authRouter = Router();

// create a new user
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
