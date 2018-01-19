import { IExpression } from './../shared/models/configuration/elements/Expression';
import * as mongoose from "mongoose";


export type ExpressionEntityModel = mongoose.Document & IExpression;

const expressionSchema = new mongoose.Schema(
    {
        configId: { type: String, index: true },
        expressionType: { type: String, index: true },
        name: String,
        description: String,
        dependencies: Array,
        tags: Array,

        customFunction: String
    },
    {
        timestamps: true,
        strict: false // allow things to be saved that are not part of the schema
    } as any
);

const ExpressionEntity = mongoose.model<ExpressionEntityModel>("Expression", expressionSchema, "configElements");
export { ExpressionEntity };
