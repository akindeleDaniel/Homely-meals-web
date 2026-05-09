import express from "express";
import path from "path";
import { ValidateError } from "tsoa";
import cors from "cors";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the React build
const clientPath = "C:\\Users\\Daniel\\.vscode\\Homely-meals-web\\client\\dist";
console.log("Serving static files from:", clientPath);
app.use(express.static(clientPath));

// API routes
RegisterRoutes(app);

// Test route
app.get('/test', (req, res) => {
  res.send('Test route works');
});

// Catch all handler: send back React's index.html file for client-side routing
app.use((req, res) => {
  console.log("Serving index.html for", req.path);
  res.sendFile("C:\\Users\\Daniel\\.vscode\\Homely-meals-web\\client\\dist\\index.html");
});

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

