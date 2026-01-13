import express from "express";
import { ValidateError } from "tsoa";
import cors from "cors";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());

RegisterRoutes(app);

app.use((err: any, req: any, res: any, _next: any) => {
  if (err instanceof ValidateError) {
    console.error("Validation Error:", err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  console.error("ERROR PATH:", req.path);
  console.error("ERROR NAME:", err?.name);
  console.error("ERROR MESSAGE:", err?.message);
  console.error("ERROR STACK:", err?.stack);
  console.error("FULL ERROR:", err);

  res.status(err?.status || 500).json({
    error: err?.name || "InternalServerError",
    message: err?.message || "Unknown server error",
  });
});

