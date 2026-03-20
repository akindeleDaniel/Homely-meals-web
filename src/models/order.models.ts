import mongoose from "mongoose";

  const OrderSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userEmail: { type: String },
      phoneNumber: { type: String, required: true },

      items:{
        type: mongoose.Schema.Types.Mixed,
      required: true,
      },

      subtotal: { type: Number,required: true },
      deliveryFee: { type: Number, required: true },
      total: { type: Number, required: true },
      currency:{ type: String, default:"₦" },

      deliveryType: { 
        type: String, 
        enum: ["pickup", "delivery"], 
        required: true 
      },
      deliveryAddress: String,
      pickupLocation: String,
      deliveryWindow: String,

      status: { 
        type: String, 
        default: "pending",
      }
    },
    { timestamps: true }  
  )

export default mongoose.model("Order", OrderSchema);
