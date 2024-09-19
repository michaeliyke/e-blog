import { Router } from "express";
import {
  getAllUsers,
  createUsers,
  updateUser,
  getUserInfo,
  getUserProfile,
  getUserPosts,
  updateUserPassword,
  postSaveUnsave,
  getUserPublicPosts,
  getSavedPosts,
} from "../controllers/UserController.js";
import User from "../models/User.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const userRouter = Router();
export const upload = multer({ storage: multer.memoryStorage() });

// get all users
userRouter.get("/", getAllUsers);

// get a user by userId or by slug (for public users)
userRouter.get("/info", getUserInfo);

// update a user
userRouter.put("/profile", isAuthenticated, upload.single("image"), updateUser);

// get user info
userRouter.get("/profile", isAuthenticated, getUserProfile);

// get user posts
userRouter.get("/posts", isAuthenticated, getUserPosts);

// update user password
userRouter.put("/pwd-ch", isAuthenticated, updateUserPassword);

userRouter.post("/bookmarks", isAuthenticated, postSaveUnsave);

// get saved posts
userRouter.get("/bookmarks", isAuthenticated, getSavedPosts);

userRouter.get("/:userId/posts", isAuthenticated, getUserPublicPosts);

// drops the users collection
userRouter.delete("/", async (req, res) => {
  await User.collection.drop();
  return res.status(200).json({ status: "users collection droped" });
});

userRouter.post("/create_db", createUsers);

export default userRouter;
