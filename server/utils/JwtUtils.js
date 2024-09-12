import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtSecret = process.env["JWT_SECRET"] || "create a new secret";

export const createJwtToken = async (payload) => {
  // create a JWT token
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = async (token) => {
  // verify the integrity of a token
  // check if the token is expired
  return jwt.verify(token, jwtSecret);
};
