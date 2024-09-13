import { verifyToken } from "../utils/JwtUtils.js";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies._token;
  if (!token || !token.startsWith("Bearer ")) {
    // console.log("token from cookie:", token);
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
  try {
    const { userId } = await verifyToken(token.slice(7));
    if (await User.exists({ _id: userId })) {
      req.userId = userId;
      next();
    }
  } catch (err) {
    console.log("JWT Error: \\/ \\/ \\/ \\/\n", err);
    res.clearCookie("_token");
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
};
