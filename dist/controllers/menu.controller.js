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
const prices_1 = require("../constants/prices");
const delivery_1 = require("../constants/delivery");
let MenuController = class MenuController extends tsoa_1.Controller {
    async getHome() {
        return {
            headline: "Special Wednesday Stir-Fried Spaghetti",
            subtext: "Choose how many plates you want, add any proteins, and add any ready-made combos.",
            orderButtonText: "Order Your Spag Now",
            baseMeal: {
                name: "Stir-Fried Spaghetti",
                price: prices_1.BASE_PRICE,
                currency: prices_1.CURRENCY,
            },
            deliveryInfo: {
                window: delivery_1.DELIVERY_WINDOW,
                note: "Delivery and pickup are available within this time frame only",
            },
            proteins: Object.entries(prices_1.PROTEIN_PRICES).map(([name, price]) => ({ name, price })),
            combos: Object.entries(prices_1.COMBO_PRICES).map(([name, price]) => ({ name, price })),
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