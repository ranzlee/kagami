import { FieldType } from './../../enums/FieldType';
import { BaseConfigurationElement } from "./BaseConfigurationElement";

export class Field extends BaseConfigurationElement {
    type: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;
}