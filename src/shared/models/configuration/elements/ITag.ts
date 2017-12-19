import { IConfigurationElement } from './IConfigurationElement';

export interface ITag extends IConfigurationElement {
    id: string;
    name: string;
}