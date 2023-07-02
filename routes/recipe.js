import express from "express";
var router = express.Router();
import Recipe from "../models/Recipe.js";
import Category from "../models/Category.js";
import {
  getAllRecipe,
  getRecipeById,
} from "../controllers/recipeController.js";

router.post("/", async (req, res, next) => {
  const newRecipe = new Recipe(req.body);

  try {
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/category", async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.send("error");
    res.status(500).json(error);
  }
});

router.get("/", getAllRecipe);

router.get("/:id", getRecipeById);

export default router;
