import { IConfigurationElement } from './IConfigurationElement';

export interface IConfiguration extends IConfigurationElement {
    configurationElements: string[];
    currentChangeEventId: number;
    [key: string]: any;
}