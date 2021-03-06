import { Record } from 'immutable';
import { ConfigElementType } from './../../enums/ConfigElementType';
import { GenericPartial } from './../../Helpers';

export interface IConfigElement {
    _id: string;
    configId: string;
    configElementType?: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];
    [key: string]: any;
}

const configElementDefaults: IConfigElement = {
    _id: "",
    configId: "",
    configElementType: undefined,
    name: "",
    description: "",
    dependencies: [],
    tags: []
}

export function getConfigElementDefaults(): IConfigElement {
    return { ...configElementDefaults }; // Make copy to be sure nobody changes default values
}
