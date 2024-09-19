import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtSecret = process.env["JWT_SECRET"] || "create a new secret";

export const createJwtToken = async (payload, checked) => {
  // create a JWT token
  return jwt.sign(payload, jwtSecret, { expiresIn: checked ? "15d" : "2h" });
};

export const verifyToken = async (token) => {
  // verify the integrity of a token
  // check if the token is expired
  return jwt.verify(token, jwtSecret);
};
