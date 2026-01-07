import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    baseMeal: String,
    proteins: [String],
    combo: String,
    subtotal: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
