import { v4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dbInfo from "../models/DbInfo.js";

export const createId = () => {
  return v4();
};

export const createShortId = () => {
  return v4().slice(0, 8);
};

export const generateHref = async (oldHref) => {
  let href;
  do {
    href = `${oldHref}-${createShortId()}`;
  } while (await User.exists({ href }));
  return href;
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getNextTagId = async () => {
  const info = await dbInfo.findOneAndUpdate(
    {},
    { $inc: { tagCount: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  return info.tagCount;
};
