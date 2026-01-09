import express from "express";
import cors from "cors";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());

RegisterRoutes(app);

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.status || 500).json({ message: err.message });
});
