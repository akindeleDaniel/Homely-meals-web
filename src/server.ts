import { app } from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB()
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs on http://localhost:${PORT}/docs`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error(" DB connection failed:", err);
    process.exit(1)
  }
};

startServer();
