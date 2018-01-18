import { Record } from 'immutable';
import { IConfigElement, getConfigElementDefaults } from "./IConfigElement";
import { GenericPartial } from "./../../Helpers";
import { ConfigElementType } from "./../../enums/ConfigElementType";


export interface IExpression extends IConfigElement {
    customFunction: string;
    [key: string]: any;
}

function getExpressionDefaults(): IExpression {
    return {
        ...getConfigElementDefaults(),
        customFunction: ""
    };
}

export type ExpressionParams = GenericPartial<IExpression>;

export class ExpressionRecord extends Record(getExpressionDefaults()) implements IExpression {
    constructor(params?: ExpressionParams) {
        params ? super(params) : super();
    }

    _id: string;
    configId: string;
    configElementType?: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];

    customFunction: string;
    [key: string]: any;
}