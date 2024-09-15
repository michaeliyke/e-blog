import Tag from "../models/Tag.js";

export const autoComplete = async (req, res) => {
  const tag = req.query.tag;
  const regex = new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (!tag) {
    return res.sendStatus(400);
  }
  const tags = await Tag.find({ name: regex }, "name")
    .sort({ count: -1 })
    .limit(10)
    .lean();
  return res.json(tags);
};
