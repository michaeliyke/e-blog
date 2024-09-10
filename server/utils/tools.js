import { v4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const createId = () => {
  return v4();
};

const createShortId = () => {
  return v4().slice(0, 8);
};

const generateHref = async (oldHref) => {
  let href;
  do {
    href = `${oldHref}-${createShortId()}`;
  } while (await User.exists({ href }));
  return href;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { createId, createShortId, hashPassword, checkPassword, generateHref };
