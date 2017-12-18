import { IConfigurationElement } from "configElements/IConfigurationElement";

export interface IField extends IConfigurationElement {
    type: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    tags: string[];
}

export enum FieldType {
    textBox = "TextBox",
    textArea = "TextArea",
    number = "Numeric",
    email = "Email"
}