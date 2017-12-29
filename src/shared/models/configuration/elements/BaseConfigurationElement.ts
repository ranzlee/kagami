import { ConfigElementType } from './../../enums/ConfigElementType';
import { IConfigurationElement } from './IConfigurationElement';

export abstract class BaseConfigurationElement implements IConfigurationElement {
    _id: string;
    configId: string;
    configElementType: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];
}