import User from "../models/user.js";
import { generateHref, hashPassword } from "../utils/tools.js";
import { fakeUsers } from "../utils/FakeData.js";

async function getAllUsers(req, res) {
  // get all users
  const data = await User.find({}, "_id firstname lastname email href").exec();
  return res.status(200).json(data);
}

async function getUserByRef(req, res) {
  // get a user by ref --> firstname-lastname/(xxxxxxxxx)
  // or 404 (not found) status if teh user is not found
  const href = req.params.href;
  const user = await User.findOne({ href }, "firstname lastname email").exec();
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json("User not found !");
}

async function getUserById(req, res) {
  // get a user by id
  // or 404 (not found) status if teh user is not found
  const userId = req.params.id;
  const user = await User.findById(
    userId,
    "_id firstname lastname email"
  ).exec();
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json("User not found !");
}

async function createNewUser(req, res) {
  // create a new user
  // if email already exists abort
  // if href already exists add an 8 chars id after id --> href-xxxxxxxx
  // Return teh created user
  const { firstname, lastname, email, password } = req.body;

  if (await User.exists({ email }).exec()) {
    return res.status(409).json({ status: "User already exists" });
  }
  console.log({ firstname, lastname, email, password });

  // check if teh href (firstname, lastname) both already exists
  let href = `${firstname.toLowerCase()}-${lastname.toLowerCase()}`;
  if (await User.exists({ href }).exec()) {
    href = await generateHref(href);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    firstname,
    lastname,
    href,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return res.status(201).json({ status: "created", newUser });
}

async function createFakeUsers(req, res) {
  // create fake users
  console.log("create fake users ...");
  await Promise.all(
    fakeUsers.map(async (data) => {
      console.log(data);
      if (await User.exists({ email: data.email })) {
        return;
      }
      const newPost = new User(data);
      await newPost.save();
    })
  );
  return res.status(201).json({ status: "all fake users created" });
}

export {
  getAllUsers,
  getUserById,
  createFakeUsers,
  createNewUser,
  getUserByRef,
};
