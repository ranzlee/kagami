import { Record, Set } from 'immutable';
import {GenericPartial} from "./../../../shared/models/Helpers";
import {ConfigElementType} from "./../../../shared/models/enums/ConfigElementType"

export interface IConfigElementsByType {
    expression: Set<string>;
    field: Set<string>;
    [key: string] : any;
}

export type ConfigElementsByTypeParams = GenericPartial<IConfigElementsByType>;

const defaultConfigElementsByType: IConfigElementsByType = {
    expression: Set<string>(),
    field: Set<string>()
}

export class ConfigElementsByTypeRecord extends Record(defaultConfigElementsByType) implements IConfigElementsByType {
    
    constructor(params?: ConfigElementsByTypeParams) {
        params ? super(params) : super();
    }

    expression: Set<string>;
    field: Set<string>;
    [key: string] : any;
}