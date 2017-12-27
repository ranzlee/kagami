import { Configuration as Config } from './../shared/models/configuration/Configuration';
import * as mongoose from "mongoose";


export type ConfigurationModel = mongoose.Document & Config;

const configurationSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true },
        name: String,
        tenant: String,
        currentChangeEvent: Number,
    },
    { timestamps: true } as any
);

const Configuration = mongoose.model<ConfigurationModel>("Configuration", configurationSchema);
export { Configuration };
