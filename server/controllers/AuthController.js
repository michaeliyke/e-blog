import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtSecret = process.env["JWT_SECRET"] || "create a new secret";

export const createJwtToken = async (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1m" });
};

export const verifyToken = async (token) => {
  //   console.log({ token });
  return jwt.verify(token, jwtSecret);
};
