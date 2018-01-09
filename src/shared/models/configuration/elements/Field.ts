import { Record } from 'immutable';
import { FieldType } from './../../enums/FieldType';
import { BaseConfigElement } from "./BaseConfigElement";
import { ConfigElementRecord, IConfigElement, getConfigElementDefaults } from './IConfigElement';
import { ConfigElementType } from './../../enums/ConfigElementType';

export interface IField extends IConfigElement {
    type?: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;
}

export function getFieldDefaults(): IField {
    return {
        ...getConfigElementDefaults(),
        type: undefined,
        displayExpression: "",
        readonlyExpression: "",
        defaultValueExpression: ""
    };
}

export class Field extends BaseConfigElement implements IField {
    type: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;
}



export class FieldRecord extends Record(getFieldDefaults()) implements IField {
    constructor(params?: IField) {
        params ? super(params) : super();
    }

    _id: string;
    configId: string;
    configElementType?: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];

    type: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;
}
