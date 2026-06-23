"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const order_service_1 = require("./services/order.service");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json({
    verify: (req, _res, buffer) => {
        req.rawBody = buffer.toString("utf8");
    },
}));
exports.app.post("/webhook/paystack", async (req, res, next) => {
    try {
        const signature = req.headers["x-paystack-signature"];
        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (secret && signature) {
            const hash = crypto_1.default
                .createHmac("sha512", secret)
                .update(req.rawBody || "")
                .digest("hex");
            if (hash !== signature) {
                return res.status(401).json({ message: "Invalid Paystack signature" });
            }
        }
        const event = req.body;
        if (event?.event === "charge.success" && event?.data?.status === "success") {
            await (0, order_service_1.createOrderFromPaystackMetadata)(event.data.reference, event.data.metadata ?? {}, event.data.customer?.email);
        }
        return res.json({ received: true });
    }
    catch (err) {
        return next(err);
    }
});
(0, routes_1.RegisterRoutes)(exports.app);
exports.app.get("/test", (_req, res) => {
    res.send("Test route works");
});
exports.app.use((err, req, res, _next) => {
    if (err instanceof tsoa_1.ValidateError) {
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
//# sourceMappingURL=app.js.map