import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    servingTime: {
      type: Number,
      required: true,
    },
    servingSize: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    ingredients: [
      {
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
        amount: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);
