"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined in .env");
    }
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection failed", error);
        throw error;
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map