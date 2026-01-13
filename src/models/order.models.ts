import mongoose from "mongoose";

  const OrderSchema = new mongoose.Schema(
    {
      userEmail: { type: String, required: true },
      phoneNumber: { type: String, required: true },

      items:{
        proteins:[
          {
            name:String,
            quantity:Number
          }
        ],
        combos:[
          {
            name:String,
            quantity:Number
          },
        ],  
      },

      subtotal: { type: Number,required: true },
      deliveryFee: { type: Number, required: true },
      total: { type: Number, required: true },
      currency:{ type: String, required: true },

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
