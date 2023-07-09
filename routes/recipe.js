import express from "express";
var router = express.Router();
import Recipe from "../models/Recipe.js";
import Category from "../models/Category.js";
import {
  changeRecipeStatus,
  deleteRecipe,
  getAllPendingRecipe,
  getAllRecipe,
  getRecipeById,
  getRecipeOwner,
} from "../controllers/recipeController.js";
import User from "../models/User.js";

//create recipe
router.post("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const newRecipe = new Recipe(req.body);
  try {
    const recipeInfo = await newRecipe.save();

    const user = await User.updateOne(
      { _id: userId },
      { $push: { createdRecipe: recipeInfo._id } }
    );

    const respond = {
      success: true,
      message: "Recipe sucessfully created !",
      recipe: recipeInfo,
    };

    res.status(200).json(respond);
  } catch (error) {
    next(error);
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

router.get("/pending", getAllPendingRecipe);

router.put("/status", changeRecipeStatus);

router.get("/owner/:id", getRecipeOwner);

router.get("/:id", getRecipeById);

router.delete("/", deleteRecipe);

export default router;
