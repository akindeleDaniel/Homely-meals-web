import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
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
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        phoneNumber?: string | null | undefined;
        password?: string | null | undefined;
        email?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        phoneNumber?: string | null | undefined;
        password?: string | null | undefined;
        email?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    password?: string | null | undefined;
    email?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=user.models.d.ts.map