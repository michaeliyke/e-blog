import { Router } from "express";
import {
  getAllUsers,
  getUserByRef,
  getUserById,
  createUsers,
  registerUser,
  updateUser,
} from "../controllers/UserController.js";
import User from "../models/User.js";

const userRouter = Router();
// get all users
userRouter.get("/", getAllUsers);

// get a user by id
userRouter.get("/:id", getUserById);

// get a user by href
userRouter.get("/h/:href", getUserByRef);

// create a new user
userRouter.post("/", registerUser);

// create some fake users
userRouter.post("/create_db", createUsers);

userRouter.put("/:id", updateUser);

// drops the users collection
userRouter.delete("/", async (req, res) => {
  await User.collection.drop();
  return res.status(200).json({ status: "users collection droped" });
});

export default userRouter;
