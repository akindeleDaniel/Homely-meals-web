import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    email: string;
    password: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        email: string;
        password: string;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        email: string;
        password: string;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=admin.model.d.ts.map