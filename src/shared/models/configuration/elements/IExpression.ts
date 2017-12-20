import { IConfigurationElement } from './IConfigurationElement';

export interface IExpression extends IConfigurationElement {
    customFunction: string;
}