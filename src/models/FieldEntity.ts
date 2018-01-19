import { IField } from './../shared/models/configuration/elements/Field';
import * as mongoose from "mongoose";
import { FieldType } from './../shared/models/enums/FieldType';

export type FieldEntityModel = mongoose.Document & IField;


const fieldSchema = new mongoose.Schema(
    {
        configId: { type: String, index: true },
        fieldType: { type: String, index: true },
        name: String,
        description: String,
        dependencies: Array,
        tags: Array,

        type: {
            type: Object.keys(FieldType).filter(k => k[0] === k[0].toUpperCase()),
            required: false
        },
        displayExpression: String,
        readonlyExpression: String,
        defaultValueExpression: String,
        addresses: [{
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            zipcode: String,
        }]
    },
    {
        usePushEach: true,
        timestamps: true,
    } as any
);

const FieldEntity = mongoose.model<FieldEntityModel>("Field", fieldSchema, "configElements");
export { FieldEntity };
