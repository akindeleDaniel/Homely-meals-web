/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MainController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MenuController } from './../controllers/menu.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../controllers/admin.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "RegisterRequest": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItem": {
        "dataType": "refObject",
        "properties": {
            "baseMeal": {"dataType":"string"},
            "proteins": {"dataType":"array","array":{"dataType":"string"}},
            "combo": {"dataType":"string"},
            "subtotal": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddToCartRequest": {
        "dataType": "refObject",
        "properties": {
            "proteins": {"dataType":"array","array":{"dataType":"string"}},
            "combo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "items": {"ref":"CartItem","required":true},
            "subtotal": {"dataType":"double","required":true},
            "deliveryFee": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["confirmed"]},{"dataType":"enum","enums":["delivered"]}],"required":true},
            "deliveryType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pickup"]},{"dataType":"enum","enums":["delivery"]}],"required":true},
            "deliveryAddress": {"dataType":"string"},
            "pickupLocation": {"dataType":"string"},
            "deliveryWindow": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaceOrderRequest": {
        "dataType": "refObject",
        "properties": {
            "deliveryType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pickup"]},{"dataType":"enum","enums":["delivery"]}],"required":true},
            "deliveryAddress": {"dataType":"string"},
            "deliveryArea": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["gk"]},{"dataType":"enum","enums":["outside-gk"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminLoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__": {
        "dataType": "refAlias",
        "type": {"ref":"mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "mongoose.Document_unknown.__._userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps._id-string_._timestamps-true__": {
        "dataType": "refAlias",
        "type": {"ref":"mongoose.ObjectIdToString_Omit_mongoose.Require_id_DocType-and-TVirtuals_.__v__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.Exclude_keyof_userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick__userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.Exclude_keyof_userEmail-string--phoneNumber-string--items-any--status-pending-or-confirmed-or-delivered--subtotal_63_-number--deliveryFee_63_-number--total_63_-number--deliveryAddress_63_-string--pickupLocation_63_-string--deliveryWindow_63_-string--deliveryType_63_-pickup-or-delivery_-and-mongoose.DefaultTimestampProps-and-__id-mongoose.Types.ObjectId_-and-___v-number_.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "updateOrderStatusRequest": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["confirmed"]},{"dataType":"enum","enums":["delivered"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NativeDate": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsMainController_getLanding: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/main/landing',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.getLanding)),

            async function MainController_getLanding(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_getLanding, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'getLanding',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"RegisterRequest"},
        };
        app.post('/main/register',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.register)),

            async function MainController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_register, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginRequest"},
        };
        app.post('/main/login',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.login)),

            async function MainController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_login, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_addToCart: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"AddToCartRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/main/cart/add',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.addToCart)),

            async function MainController_addToCart(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_addToCart, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'addToCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_getCart: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/main/cart',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.getCart)),

            async function MainController_getCart(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_getCart, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'getCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_clearCart: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/main/cart/clear',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.clearCart)),

            async function MainController_clearCart(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_clearCart, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'clearCart',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMainController_placeOrder: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"PlaceOrderRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/main/order/place',
            ...(fetchMiddlewares<RequestHandler>(MainController)),
            ...(fetchMiddlewares<RequestHandler>(MainController.prototype.placeOrder)),

            async function MainController_placeOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMainController_placeOrder, request, response });

                const controller = new MainController();

              await templateService.apiHandler({
                methodName: 'placeOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMenuController_getHome: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/menu/home',
            ...(fetchMiddlewares<RequestHandler>(MenuController)),
            ...(fetchMiddlewares<RequestHandler>(MenuController.prototype.getHome)),

            async function MenuController_getHome(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMenuController_getHome, request, response });

                const controller = new MenuController();

              await templateService.apiHandler({
                methodName: 'getHome',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"AdminLoginRequest"},
        };
        app.post('/admin/login',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.login)),

            async function AdminController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_login, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_updateOrderStatus: Record<string, TsoaRoute.ParameterSchema> = {
                orderId: {"in":"path","name":"orderId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"updateOrderStatusRequest"},
        };
        app.put('/admin/orders/:orderId',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.updateOrderStatus)),

            async function AdminController_updateOrderStatus(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_updateOrderStatus, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'updateOrderStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getAllOrders: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/admin/orders',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getAllOrders)),

            async function AdminController_getAllOrders(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getAllOrders, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getAllOrders',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
