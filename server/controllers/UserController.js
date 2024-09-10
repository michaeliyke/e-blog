import User from "../models/User.js";
import { checkPassword, generateHref, hashPassword } from "../utils/tools.js";
import { fakeUsers } from "../utils/FakeData.js";

async function getAllUsers(req, res) {
  // get all users
  const data = await User.find({}, "-password").exec();
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

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  const user = await User.findById(id).exec();
  if (checkPassword(oldPassword, user.password)) {
    user.password = hashPassword(newPassword);
    user.save();
  }
};

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

async function registerUser(req, res) {
  // create a new user
  // if email already exists abort
  // if href already exists add an 8 chars id after id --> href-xxxxxxxx
  // Return teh created user
  const { firstname, lastname, email, password } = req.body;

  if (await User.exists({ email }).exec()) {
    return res.status(409).json({ status: "User already exists" });
  }

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
  try {
    await newUser.save();
    return res.status(201).json({ status: "user created" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMsgs = Object.values(err.errors).map((error) => error.message);
      return res
        .status(400)
        .json({ error: "Validation Error", messages: errorMsgs });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Later try using static method to validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid user email" });
    if (!(await checkPassword(password, user.password)))
      return res.status(400).json({ message: "Invalid user password" });

    // return the JWT
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

async function createUsers(req, res) {
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

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { runValidators: true, new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (err.name === "ValidationError") {
      const errorMsgs = Object.values(err.errors).map((error) => error.message);
      return res
        .status(400)
        .json({ error: "Validation Error", messages: errorMsgs });
    }
    console.log(JSON.stringify(err));
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  getAllUsers,
  getUserById,
  createUsers,
  registerUser,
  getUserByRef,
  loginUser,
  updateUser,
};
