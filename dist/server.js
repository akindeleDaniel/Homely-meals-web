"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        console.log("MongoDB connected");
        app_1.app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Swagger docs on http://localhost:${PORT}/docs`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    }
    catch (err) {
        console.error(" DB connection failed:", err);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map