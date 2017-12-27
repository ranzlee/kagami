import { ConfigElementType } from './../../enums/ConfigElementType';

export interface IConfigurationElement {
    id: string;
    configId: string;
    configElementType: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];
    [key: string]: any;
}