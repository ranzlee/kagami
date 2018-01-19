import { IConfigElement } from './../shared/models/configuration/elements/IConfigElement';
import * as mongoose from "mongoose";


export type ConfigElementEntityModel = mongoose.Document & IConfigElement;

const configElementSchema = new mongoose.Schema(
    {
        configId: {type: String, index: true},
        configElementType: {type: String, index: true},
        name: String,
        description: String,
        dependencies: Array,
        tags: Array,
    },
    { 
        timestamps: true,
        strict: false // allow things to be saved that are not part of the schema
    } as any
);

const ConfigElementEntity = mongoose.model<ConfigElementEntityModel>("ConfigElement", configElementSchema, "configElements");
export { ConfigElementEntity };
