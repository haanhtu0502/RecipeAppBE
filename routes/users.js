import express from "express";
var router = express.Router();
import User from "../models/User.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find().populate("favoriteRecipe.recipe");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
