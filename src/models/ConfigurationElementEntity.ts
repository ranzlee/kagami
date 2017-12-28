import { IConfigurationElement } from './../shared/models/configuration/elements/IConfigurationElement';
import * as mongoose from "mongoose";


export type ConfigurationElementEntityModel = mongoose.Document & IConfigurationElement;

const configurationElementSchema = new mongoose.Schema(
    {
        _id: String,
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

const ConfigurationElementEntity = mongoose.model<ConfigurationElementEntityModel>("ConfigurationElement", configurationElementSchema);
export { ConfigurationElementEntity };
