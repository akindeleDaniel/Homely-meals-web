"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatAppService = void 0;
const twilio_1 = require("../utils/twilio");
exports.whatAppService = {
    notifyOrder(phone, name, status) {
        return (0, twilio_1.sendWhatsApp)(phone, `Hi ${name}, your order has been placed successfully!
            Status: ${status},
            Thank you for choosing Homely Meals`);
    }
};
//# sourceMappingURL=whatsapp.service.js.map