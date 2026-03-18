"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePaystack = initializePaystack;
const https_1 = __importDefault(require("https"));
function initializePaystack(data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            email: data.email,
            amount: data.amount,
            reference: data.reference,
            metadata: data.metadata,
        });
        const options = {
            hostname: "api.paystack.co",
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
                "Content-Length": payload.length,
            },
        };
        const req = https_1.default.request(options, (res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve(parsed);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        req.on("error", (error) => {
            reject(error);
        });
        req.write(payload);
        req.end();
    });
}
//# sourceMappingURL=paystack.service.js.map