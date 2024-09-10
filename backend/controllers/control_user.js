import bcrypt from "bcrypt";
import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json({ users });
  } catch (err) {
    console.log(JSON.stringify(err));
    return res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = password ? bcrypt.hashSync(password) : password;
  const user = new User({ firstName, lastName, email, passwordHash });

  try {
    await user.save();
    return res.status(201).json({ user });
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Later try using static method to validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid user email" });
    if (password !== user.password)
      return res.status(400).json({ message: "Invalid user password" });
    return res.json({ user });
  } catch (err) {
    console.log(JSON.stringify(err));
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch {
    console.log(JSON.stringify(err));
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, password },
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
