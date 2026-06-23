import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      plates: {
        type: Number,
        default: 0,
      },
      proteins: [
        {
          name: String,
          quantity: Number,
        },
      ],
      combos: [
        {
          name: String,
          quantity: Number,
        },
      ],
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: "₦",
    },
    itemsText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
