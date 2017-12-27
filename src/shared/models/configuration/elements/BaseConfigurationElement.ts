import { ConfigElementType } from './../../enums/ConfigElementType';
import { IConfigurationElement } from './IConfigurationElement';

export abstract class BaseConfigurationElement implements IConfigurationElement {
    id: string;
    configId: string;
    configElementType: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];
}