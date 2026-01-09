import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    phoneNumber: string;
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    phoneNumber: string;
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    phoneNumber: string;
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
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
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    phoneNumber: string;
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
    deliveryAddress?: string | null | undefined;
    pickupLocation?: string | null | undefined;
    deliveryWindow?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    phoneNumber: string;
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
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
        userEmail: string;
        items: any;
        subtotal: number;
        deliveryFee: number;
        total: number;
        deliveryType: "pickup" | "delivery";
        status: "pending" | "confirmed" | "delivered";
        deliveryAddress?: string | null | undefined;
        pickupLocation?: string | null | undefined;
        deliveryWindow?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        phoneNumber: string;
        userEmail: string;
        items: any;
        subtotal: number;
        deliveryFee: number;
        total: number;
        deliveryType: "pickup" | "delivery";
        status: "pending" | "confirmed" | "delivered";
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
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
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
    userEmail: string;
    items: any;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryType: "pickup" | "delivery";
    status: "pending" | "confirmed" | "delivered";
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