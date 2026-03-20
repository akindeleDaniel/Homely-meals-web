import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
        userId: mongoose.Types.ObjectId;
        subtotal: number;
        currency: string;
        itemsText: string;
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
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        userId: mongoose.Types.ObjectId;
        subtotal: number;
        currency: string;
        itemsText: string;
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
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    subtotal: number;
    currency: string;
    itemsText: string;
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=cart.model.d.ts.map