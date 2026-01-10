import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";


const PORT = process.env.PORT || 3000;
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


(async () => {
  await connectDB();
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
  console.log("Swagger docs on http://localhost:3000/docs")
})
})();
