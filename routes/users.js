import express from "express";
var router = express.Router();
import User from "../models/User.js";
import {
  addRecipeToFavourite,
  getUserById,
  removeRecipeFromFavourite,
  setDateAndMeal,
} from "../controllers/userController.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find().populate([
      "favoriteRecipe.recipe",
      "createdRecipe",
    ]);
    res.status(200).json(user);
  } catch (error) {
    res.send("error");
    // res.status(500).json(error);
  }
});

router.post("/favourite", addRecipeToFavourite);

router.delete("/favourite", removeRecipeFromFavourite);

router.put("/favourite", setDateAndMeal);

router.get("/:id", getUserById);

export default router;
