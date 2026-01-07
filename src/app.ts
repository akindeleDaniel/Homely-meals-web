import express, { Request, Response, NextFunction } from "express";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import cors from "cors";

export const app = express();

app.use(cors())
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});
