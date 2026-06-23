import crypto from "crypto";
import express from "express";
import { ValidateError } from "tsoa";
import cors from "cors";
import { RegisterRoutes } from "./routes/routes";
import { createOrderFromPaystackMetadata } from "./services/order.service";

export const app = express();

app.use(cors());
app.use(
  express.json({
    verify: (req, _res, buffer) => {
      (req as any).rawBody = buffer.toString("utf8");
    },
  })
);

app.post("/webhook/paystack", async (req, res, next) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (secret && signature) {
      const hash = crypto
        .createHmac("sha512", secret)
        .update((req as any).rawBody || "")
        .digest("hex");

      if (hash !== signature) {
        return res.status(401).json({ message: "Invalid Paystack signature" });
      }
    }

    const event = req.body;
    if (event?.event === "charge.success" && event?.data?.status === "success") {
      await createOrderFromPaystackMetadata(
        event.data.reference,
        event.data.metadata ?? {},
        event.data.customer?.email
      );
    }

    return res.json({ received: true });
  } catch (err) {
    return next(err);
  }
});

RegisterRoutes(app);

app.get("/test", (_req, res) => {
  res.send("Test route works");
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

  return res.status(err?.status || 500).json({
    error: err?.name || "InternalServerError",
    message: err?.message || "Unknown server error",
  });
});
