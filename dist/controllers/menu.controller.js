"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const tsoa_1 = require("tsoa");
let MenuController = class MenuController extends tsoa_1.Controller {
    async getHome() {
        return {
            headline: "Special Wednesday Stir-Fried Spaghetti 🍝",
            subtext: "Choose your base spaghetti. Add your preferred proteins or pick a ready-made combo.",
            orderButtonText: "🟢 Order Your Spag Now",
            baseMeal: {
                name: "Stir-Fried Spaghetti (No Protein)",
                price: 2000,
                currency: "₦",
            },
            deliveryInfo: {
                window: "Wednesday 2:00 PM – 5:00 PM",
                note: "Delivery and pickup available within this time frame only",
            },
            proteins: [
                { name: "Egg", price: 500 },
                { name: "coleslaw", price: 500 },
                { name: "Beef", price: 1000 },
                { name: "Fish", price: 1000 },
                { name: "Plantain + Fish", price: 1500 },
                { name: "Chicken", price: 1500 },
                { name: "Sardine", price: 1500 },
            ],
            combos: [
                { name: "Stir-Fried Spag + Sardine & Fried Fish", price: 4500 },
                { name: "Stir-Fried Spag + Egg & Fried Fish", price: 4000 },
                { name: "Stir-Fried Spag + Egg", price: 2500 },
                { name: "Stir-Fried Spag + Beef", price: 3000 },
                { name: "Stir-Fried Spag + Fish & Plantain", price: 3500 },
                { name: "Stir-Fried Spag + Dodo & Beef", price: 3500 },
            ],
        };
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, tsoa_1.Get)("home"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getHome", null);
exports.MenuController = MenuController = __decorate([
    (0, tsoa_1.Route)("menu"),
    (0, tsoa_1.Tags)("Menu")
], MenuController);
//# sourceMappingURL=menu.controller.js.map