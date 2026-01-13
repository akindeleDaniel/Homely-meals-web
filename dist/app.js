"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
(0, routes_1.RegisterRoutes)(exports.app);
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
    console.error("FULL ERROR:", err);
    res.status(err?.status || 500).json({
        error: err?.name || "InternalServerError",
        message: err?.message || "Unknown server error",
    });
});
//# sourceMappingURL=app.js.map