import { createError } from "../utils/error.js";
import Recipe from "../models/Recipe.js";

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