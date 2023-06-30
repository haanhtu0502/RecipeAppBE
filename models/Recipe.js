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
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
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
