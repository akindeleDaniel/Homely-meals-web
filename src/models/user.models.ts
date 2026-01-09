import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: { type: String, unique: true },
      phoneNumber: String,
      password: String,
    },
    { timestamps: true }
  )
);
