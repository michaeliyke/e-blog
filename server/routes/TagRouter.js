import { Router } from "express";
import Tag from "../models/Tag.js";
import dbInfo from "../models/DbInfo.js";
import { getNextTagId } from "../utils/tools.js";
import { autoComplete, getTopTags } from "../controllers/TagConntroller.js";

const tagRouter = Router();

tagRouter.get("/suggest", autoComplete);

tagRouter.get("/top", getTopTags);

tagRouter.post("/", async (req, res) => {
  const { tag } = req.body;
  console.log("create tag");
  try {
    const newId = await getNextTagId();
    console.log(newId);
    const newTag = await Tag({ name: tag, _id: newId });
    newTag.save();
    return res.status(201).json({});
  } catch (err) {
    return res.sendStatus(err.status);
  }
});

export default tagRouter;
