"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const menu_controller_1 = require("./../controllers/menu.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const admin_controller_1 = require("./../controllers/admin.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "RegisterRequest": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItem": {
        "dataType": "refObject",
        "properties": {
            "baseMeal": { "dataType": "string" },
            "proteins": { "dataType": "array", "array": { "dataType": "string" } },
            "combo": { "dataType": "string" },
            "subtotal": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddToCartRequest": {
        "dataType": "refObject",
        "properties": {
            "proteins": { "dataType": "array", "array": { "dataType": "string" } },
            "combo": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "items": { "ref": "CartItem", "required": true },
            "subtotal": { "dataType": "double", "required": true },
            "deliveryFee": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["pending"] }, { "dataType": "enum", "enums": ["confirmed"] }, { "dataType": "enum", "enums": ["delivered"] }], "required": true },
            "deliveryType": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["pickup"] }, { "dataType": "enum", "enums": ["delivery"] }], "required": true },
            "deliveryAddress": { "dataType": "string" },
            "pickupLocation": { "dataType": "string" },
            "deliveryWindow": { "dataType": "string" },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaceOrderRequest": {
        "dataType": "refObject",
        "properties": {
            "deliveryType": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["pickup"] }, { "dataType": "enum", "enums": ["delivery"] }], "required": true },
            "deliveryAddress": { "dataType": "string" },
            "deliveryArea": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["gk"] }, { "dataType": "enum", "enums": ["outside-gk"] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminLoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__": {
        "dataType": "refAlias",
        "type": { "ref": "mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "mongoose.Document_unknown.__._userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps._id-string_._timestamps-true__": {
        "dataType": "refAlias",
        "type": { "ref": "mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.Exclude_keyof_userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.Exclude_keyof_userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "updateOrderStatusRequest": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["pending"] }, { "dataType": "enum", "enums": ["confirmed"] }, { "dataType": "enum", "enums": ["delivered"] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NativeDate": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsMainController_getLanding = {};
    app.get('/main/landing', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.getLanding)), async function MainController_getLanding(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_getLanding, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'getLanding',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_register = {
        body: { "in": "body", "name": "body", "required": true, "ref": "RegisterRequest" },
    };
    app.post('/main/register', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.register)), async function MainController_register(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_register, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "LoginRequest" },
    };
    app.post('/main/login', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.login)), async function MainController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_login, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_addToCart = {
        body: { "in": "body", "name": "body", "required": true, "ref": "AddToCartRequest" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/main/cart/add', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.addToCart)), async function MainController_addToCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_addToCart, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'addToCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_getCart = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/main/cart', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.getCart)), async function MainController_getCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_getCart, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'getCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_clearCart = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/main/cart/clear', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.clearCart)), async function MainController_clearCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_clearCart, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'clearCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMainController_placeOrder = {
        body: { "in": "body", "name": "body", "required": true, "ref": "PlaceOrderRequest" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/main/order/place', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.placeOrder)), async function MainController_placeOrder(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_placeOrder, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'placeOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMenuController_getHome = {};
    app.get('/menu/home', ...((0, runtime_1.fetchMiddlewares)(menu_controller_1.MenuController)), ...((0, runtime_1.fetchMiddlewares)(menu_controller_1.MenuController.prototype.getHome)), async function MenuController_getHome(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMenuController_getHome, request, response });
            const controller = new menu_controller_1.MenuController();
            await templateService.apiHandler({
                methodName: 'getHome',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAdminController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "AdminLoginRequest" },
    };
    app.post('/admin/login', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.login)), async function AdminController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_login, request, response });
            const controller = new admin_controller_1.AdminController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAdminController_updateOrderStatus = {
        orderId: { "in": "path", "name": "orderId", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        body: { "in": "body", "name": "body", "required": true, "ref": "updateOrderStatusRequest" },
    };
    app.put('/admin/orders/:orderId', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.updateOrderStatus)), async function AdminController_updateOrderStatus(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_updateOrderStatus, request, response });
            const controller = new admin_controller_1.AdminController();
            await templateService.apiHandler({
                methodName: 'updateOrderStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAdminController_getAllOrders = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/admin/orders', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.getAllOrders)), async function AdminController_getAllOrders(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getAllOrders, request, response });
            const controller = new admin_controller_1.AdminController();
            await templateService.apiHandler({
                methodName: 'getAllOrders',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map