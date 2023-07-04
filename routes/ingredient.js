import express from "express";
var router = express.Router();
import Ingredient from "../models/Ingredient.js";

/* GET users listing. */
router.post("/", async (req, res, next) => {
  const newIngredient = new Ingredient(req.body);

  try {
    const savedIngredient = await newIngredient.save();
    res.status(200).json(savedIngredient);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const savedIngredient = await Ingredient.find();
    res.status(200).json(savedIngredient);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
