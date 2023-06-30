import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const existedUsername = await User.findOne({ username: req.body.username });
    if (existedUsername) {
      return next(createError(404, "Username already existed !"));
    }
    const existedEmail = await User.findOne({ email: req.body.email });
    if (existedEmail) {
      return next(createError(404, "Email already existed !"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created !" });
  } catch (err) {
    err.status = 501;
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    res.status(200).json({ success: true, userInfo: user });
  } catch (err) {
    next(err);
  }
};
