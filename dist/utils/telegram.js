"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegram = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const Telegram = async (text) => {
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error("Telegram BOT_TOKEN or CHAT_ID not set in .env");
        return;
    }
    try {
        const res = await (0, node_fetch_1.default)(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                parse_mode: "Markdown",
            }),
        });
        const data = await res.json();
        if (!data) {
            console.error("Telegram API error:", data);
        }
    }
    catch (err) {
        console.error("Failed to send Telegram message:", err);
    }
};
exports.Telegram = Telegram;
//# sourceMappingURL=telegram.js.map