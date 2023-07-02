import express from "express";
var router = express.Router();
import Category from "../models/Category.js";

router.get("/", async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

export default router;
