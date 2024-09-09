import User from "../models/user";

const fakeData = [{}];

async function getAllUsers(req, res) {
  // get all blogs
  const data = await User.find({}).select("_id firstname lastname email");

  return res.status(200).json(data);
}

async function createTestPosts(req, res) {
  // create fake data
  fakeData.map(async (data) => {
    // console.log({ ...data, userId });
    if (await Post.findOne({ title: data.title })) {
      return;
    }
    const newPost = new Post({ ...data, userId });
    await newPost.save();
  });
  return res.status(201).json({ status: "all fake posts created" });
}

export { allBlogs, createTestPosts };
