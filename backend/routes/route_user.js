import { Router } from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/control_user.js";

const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/register", registerUser);
usersRoute.post("/login", loginUser);
usersRoute.get("/:id", getUser);
usersRoute.post("/:id", updateUser);

export default usersRoute;
