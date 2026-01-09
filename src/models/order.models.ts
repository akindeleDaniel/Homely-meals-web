import mongoose from "mongoose";

  const OrderSchema = new mongoose.Schema(
    {
      userEmail: {type: String, required: true},
      phoneNumber: {type: String, required: true},
      items: {  type: Object, required: true },
      subtotal: {type: Number, required: true},
      deliveryFee: {type: Number, required: true},
      total: {type: Number, required: true},
      deliveryType: {type: String, enum: ["pickup", "delivery"], required: true},
      deliveryAddress: String,
      pickupLocation: String,
      deliveryWindow: String,
      status: {
        type: String,
        enum: ["pending", "confirmed", "delivered"],
        default: "pending",
        required: true,
      },
    },
    { timestamps: true }
  )

export default mongoose.model("Order", OrderSchema);
