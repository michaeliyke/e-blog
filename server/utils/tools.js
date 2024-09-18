import { v4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dbInfo from "../models/DbInfo.js";
import axios from "axios";
import sharp from "sharp";

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

export const stringToSlug = (str) => {
  let newStr = str.toLowerCase();
  newStr = newStr.replace(/[^a-zA-Z0-9\s]/g, "");
  newStr = newStr.replace(/\s+/g, "-");
  newStr += `-${createShortId()}`;
  return newStr;
};

export const getNextTagId = async () => {
  const info = await dbInfo.findOneAndUpdate(
    {},
    { $inc: { tagCount: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  return info.tagCount;
};

export const uploadToImgBB = async (image) => {
  let response;
  const IMG_BB = process.env.IMGBB_KEY;
  const IMG_BB_URL = `https://api.imgbb.com/1/upload?&key=${IMG_BB}`;
  // compress the image first
  const compressedImageBuffer = await sharp(image.buffer)
    .jpeg({ quality: 80 })
    .toBuffer();
  const base64Image = compressedImageBuffer.toString("base64");
  const formData = new URLSearchParams();
  formData.append("image", base64Image);
  try {
    response = await axios.post(IMG_BB_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return {
      image: response.data.data?.url || null,
      thumbnail: response.data.data.thumb?.url || response.data.data?.url,
      medium: response.data.data.medium?.url || response.data.data?.url,
      deleteUrl: response.data.data.delete_url || null,
    };
  } catch (err) {
    console.dir(err);
    axios.delete(response.data.data.delete_url);
    return null;
  }
};

export const uploadCover = async (image, post) => {
  const data = await uploadToImgBB(image);
  if (data) {
    post.cover = { ...data };
    post.save();
  }
};

export const uploadImage = async (image, user) => {
  const data = await uploadToImgBB(image);
  if (data) {
    user.profilePicture = { ...data };
    user.save();
  }
};

export const unify = (word) => {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
