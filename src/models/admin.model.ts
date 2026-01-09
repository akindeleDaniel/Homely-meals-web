import mongoose from "mongoose";

export default mongoose.model(
  "Admin",
  new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
  })
);
