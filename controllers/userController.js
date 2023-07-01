import User from "../models/User.js";

export const addRecipeToFavourite = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body;
    const favRecipe = {
      recipe: recipeId,
      date: "",
      meal: "",
    };
    const user = await User.updateOne(
      { _id: userId },
      { $push: { favoriteRecipe: favRecipe } }
    );
    const respond = {
      succes: true,
      message: "Add to favourite successfully !",
    };

    res.status(200).json(respond);
  } catch (error) {
    next(error);
  }
};

export const removeRecipeFromFavourite = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body;
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favoriteRecipe: { recipe: { _id: recipeId } } } },
      { safe: true, multi: false }
    );
    res.status(200).json({ success: true, message: "Remove successfully !" });
  } catch (error) {
    next(error);
  }
};

export const setDateAndMeal = async (req, res, next) => {
  try {
    const { userId, recipeId, date, meal } = req.body;
    const updateUser = await User.findOneAndUpdate(
      {
        _id: userId,
        "favoriteRecipe.recipe": recipeId,
      },
      {
        $set: {
          "favoriteRecipe.$.date": date,
          "favoriteRecipe.$.meal": meal,
        },
      }
    );
    res.status(200).json({ success: true, message: "update successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate([
      "favoriteRecipe.recipe",
      "createdRecipe",
    ]);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    next(error);
  }
};
