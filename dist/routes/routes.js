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
    "Protein": {
        "dataType": "refAlias",
        "type": { "dataType": "enum", "enums": ["Egg", "Beef", "Fish", "Plantain + Fish", "Chicken", "Sardine", "coleslaw"], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "proteinItems": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "quantity": { "dataType": "double", "required": true }, "name": { "ref": "Protein", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Combo": {
        "dataType": "refAlias",
        "type": { "dataType": "enum", "enums": ["Stir-Fried Spag + Sardine & Fried Fish", "Stir-Fried Spag + Egg & Fried Fish", "Stir-Fried Spag + Egg", "Stir-Fried Spag + Beef", "Stir-Fried Spag + Fish & Plantain", "Stir-Fried Spag + Dodo & Beef"], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "comboItems": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "quantity": { "dataType": "double", "required": true }, "name": { "ref": "Combo", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Cart": {
        "dataType": "refObject",
        "properties": {
            "items": { "dataType": "nestedObjectLiteral", "nestedProperties": { "combos": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "comboItems" } }, "proteins": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "proteinItems" } } }, "required": true },
            "subtotal": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "itemsText": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryArea": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["gk"] }, { "dataType": "enum", "enums": ["outside-gk"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDTO": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": { "dataType": "string", "required": true },
            "deliveryType": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["pickup"] }, { "dataType": "enum", "enums": ["delivery"] }], "required": true },
            "deliveryAddress": { "dataType": "string" },
            "deliveryArea": { "ref": "DeliveryArea" },
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
    const argsMainController_register = {
        b: { "in": "body", "name": "b", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "lastName": { "dataType": "string", "required": true }, "firstName": { "dataType": "string", "required": true }, "password": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true } } },
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
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "password": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true } } },
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
    const argsMainController_addCart = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "combo": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "comboItems" } }, "proteins": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "proteinItems" } } } },
    };
    app.post('/main/cart/add', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.addCart)), async function MainController_addCart(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMainController_addCart, request, response });
            const controller = new user_controller_1.MainController();
            await templateService.apiHandler({
                methodName: 'addCart',
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
        body: { "in": "body", "name": "body", "required": true, "ref": "OrderDTO" },
    };
    app.post('/main/order', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.MainController.prototype.placeOrder)), async function MainController_placeOrder(request, response, next) {
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
        b: { "in": "body", "name": "b", "required": true, "dataType": "any" },
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
    const argsAdminController_get = {
        r: { "in": "request", "name": "r", "required": true, "dataType": "object" },
    };
    app.get('/admin/orders', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.get)), async function AdminController_get(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_get, request, response });
            const controller = new admin_controller_1.AdminController();
            await templateService.apiHandler({
                methodName: 'get',
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
    const argsAdminController_update = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        b: { "in": "body", "name": "b", "required": true, "dataType": "any" },
        r: { "in": "request", "name": "r", "required": true, "dataType": "object" },
    };
    app.put('/admin/orders/:id', ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(admin_controller_1.AdminController.prototype.update)), async function AdminController_update(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_update, request, response });
            const controller = new admin_controller_1.AdminController();
            await templateService.apiHandler({
                methodName: 'update',
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