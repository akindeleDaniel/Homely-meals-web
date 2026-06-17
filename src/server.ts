import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";


const PORT = process.env.PORT || 3001;
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


(async () => {
  await connectDB();
app.listen(PORT, () => {
  console.log("Connected to database");
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Swagger docs on http://localhost:${PORT}/docs`)
})
})();

