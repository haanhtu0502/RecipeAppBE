import mongoose from "mongoose";
const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ingredient", IngredientSchema);
