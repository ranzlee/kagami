import { IConfigurationElement } from './IConfigurationElement';

export interface IConfiguration extends IConfigurationElement {
    configurationElements: string[];
    currentChangeEventId: number;
    [key: string]: any; // for any properties access through the accessor
}