import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        phoneNumber: string;
        subtotal: number;
        currency: string;
        userEmail: string;
        deliveryFee: number;
        total: number;
        deliveryType: "pickup" | "delivery";
        status: string;
        items?: {
            proteins: mongoose.Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: mongoose.Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
        deliveryAddress?: string | null | undefined;
        pickupLocation?: string | null | undefined;
        deliveryWindow?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        phoneNumber: string;
        subtotal: number;
        currency: string;
        userEmail: string;
        deliveryFee: number;
        total: number;
        deliveryType: "pickup" | "delivery";
        status: string;
        items?: {
            proteins: mongoose.Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
            combos: mongoose.Types.DocumentArray<{
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }> & {
                name?: string | null | undefined;
                quantity?: number | null | undefined;
            }>;
        } | null | undefined;
        deliveryAddress?: string | null | undefined;
        pickupLocation?: string | null | undefined;
        deliveryWindow?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    phoneNumber: string;
    subtotal: number;
    currency: string;
    userEmail: string;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: string;
    items?: {
        proteins: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
        combos: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }> & {
            name?: string | null | undefined;
            quantity?: number | null | undefined;
        }>;
    } | null | undefined;
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=order.models.d.ts.map