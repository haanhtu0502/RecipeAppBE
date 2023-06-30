import express from "express";
var router = express.Router();
import Recipe from "../models/Recipe.js";

/* GET users listing. */
router.post("/", async (req, res, next) => {
  const newRecipe = new Recipe(req.body);

  try {
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("ingredients.ingredient");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
