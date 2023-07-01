import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    img: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Cooker", "Guest"],
      default: "Guest",
      required: true,
    },
    createdRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    favoriteRecipe: [
      {
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
        date: String,
        meal: { type: String, enum: ["Breakfast", "Lunch", "Dinner,''"] },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
