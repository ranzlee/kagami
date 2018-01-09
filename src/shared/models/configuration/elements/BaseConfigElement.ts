import { ConfigElementType } from './../../enums/ConfigElementType';
import { IConfigElement } from './IConfigElement';

export abstract class BaseConfigElement implements IConfigElement {
    _id: string;
    configId: string;
    configElementType: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    shared: boolean;
    tags: string[];
}