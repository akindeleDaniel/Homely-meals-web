import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
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
        subtotal: number;
        userEmail: string;
        proteins: string[];
        baseMeal?: string | null | undefined;
        combo?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        subtotal: number;
        userEmail: string;
        proteins: string[];
        baseMeal?: string | null | undefined;
        combo?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    subtotal: number;
    userEmail: string;
    proteins: string[];
    baseMeal?: string | null | undefined;
    combo?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=cart.models.d.ts.map