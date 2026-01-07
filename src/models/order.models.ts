import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    items: { type: Object, required: true },

    subtotal: Number,
    deliveryFee: Number,
    total: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending",
    },

    deliveryType: {
      type: String,
      enum: ["pickup", "delivery"],
    },

    deliveryAddress: String,
    pickupLocation: String,

    deliveryWindow: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
