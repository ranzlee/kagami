import { Configuration } from './../shared/models/configuration/Configuration';
import * as mongoose from "mongoose";


export type ConfigurationEntityModel = mongoose.Document & Configuration;

const configurationSchema = new mongoose.Schema(
    {
        name: String,
        tenant: String,
        currentChangeEvent: Number,
    },
    { timestamps: true } as any
);

const ConfigurationEntity = mongoose.model<ConfigurationEntityModel>("Configuration", configurationSchema);
export { ConfigurationEntity };
