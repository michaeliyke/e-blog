import { verifyToken } from "../utils/JwtUtils.js";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  // console.log("authenticate user");
  const token = req.cookies._token;
  const url = req.originalUrl;
  const method = req.method;

  if (token && token.startsWith("Bearer ")) {
    try {
      const { userId } = await verifyToken(token.slice(7));
      if (await User.exists({ _id: userId })) {
        req.userId = userId;
        return next();
      }
    } catch (err) {
      res.clearCookie("_token");
    }
  }

  if (url.startsWith("/blogs/page/") && method === "GET") {
    return next();
  }
  return res.status(401).json({ message: "UNAUTHORIZED" });
};
