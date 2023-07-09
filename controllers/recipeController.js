import { createError } from "../utils/error.js";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getAllRecipe = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let category = req.query.category || "";
    let recipes;
    let total;
    if (category == "") {
      recipes = await Recipe.find({
        name: { $regex: search, $options: "i" },
        status: "accepted",
      })
        .populate(["ingredients.ingredient", "category"])
        .skip(page * limit)
        .limit(limit);

      total = await Recipe.countDocuments({
        name: { $regex: search, $options: "i" },
      });
    } else {
      recipes = await Recipe.find({
        name: { $regex: search, $options: "i" },
        status: "accepted",
      })
        .populate(["ingredients.ingredient", "category"])
        .where("category")
        .in(category)
        .skip(page * limit)
        .limit(limit);

      total = await Recipe.countDocuments({
        name: { $regex: search, $options: "i" },
        category: { $in: category },
      });
    }

    const respond = {
      success: true,
      totalRecipes: total,
      totalPage: Math.ceil(total / limit),
      page: page + 1,
      limit: limit,
      recipes: recipes,
    };

    res.status(200).json(respond);
  } catch (error) {
    next(error);
  }
};

export const getRecipeOwner = async (req, res, next) => {
  const recipeId = req.params.id;
  try {
    const owner = await User.find({
      createdRecipe: { $in: [recipeId] },
    });
    res.status(200).json({ success: true, owner: owner });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const recipe = await Recipe.find({ _id: id }).populate([
      "ingredients.ingredient",
      "category",
    ]);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getAllPendingRecipe = async (req, res, next) => {
  try {
    let users = await User.find({}).populate("createdRecipe");

    users = users
      .map((user) => {
        if (user.createdRecipe.length > 0) {
          user.createdRecipe = user.createdRecipe.filter(
            (recipe) => recipe.status === "pending"
          );
        }

        return user;
      })
      .filter((item) => item.createdRecipe.length > 0);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const changeRecipeStatus = async (req, res, next) => {
  const { recipeId, status } = req.body;
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      {
        $set: {
          status: status,
        },
      }
    );
    res.status(200).json({ success: true, message: "Update successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const { recipeId, userId } = req.body;
  try {
    await Recipe.findByIdAndDelete(recipeId);
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { createdRecipe: recipeId } }
    );
    res.status(200).json({ succes: true, message: "Delete Successfully" });
  } catch (error) {
    next(error);
  }
};
