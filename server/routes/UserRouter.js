import { Router } from "express";
import {
  getAllUsers,
  createUsers,
  updateUser,
  getUserInfo,
} from "../controllers/UserController.js";
import User from "../models/User.js";

const userRouter = Router();

// get all users
userRouter.get("/", getAllUsers);

// get a user by userId or by slug
userRouter.get("/info", getUserInfo);

// update a user
userRouter.put("/:id", updateUser);

// drops the users collection
userRouter.delete("/", async (req, res) => {
  await User.collection.drop();
  return res.status(200).json({ status: "users collection droped" });
});

userRouter.post("/create_db", createUsers);

export default userRouter;
