import { IConfigurationElement } from "configElements/IConfigurationElement";

export interface IExpression extends IConfigurationElement {
    customFunction: string;
}