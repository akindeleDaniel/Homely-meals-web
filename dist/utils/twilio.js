"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsApp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendWhatsApp = async (to, message) => {
    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:+2347046735408`,
            body: message,
        });
        console.log("WhatsApp message sent to", to);
    }
    catch (err) {
        console.error("Failed to send WhatsApp message:", err);
    }
};
exports.sendWhatsApp = sendWhatsApp;
//# sourceMappingURL=twilio.js.map