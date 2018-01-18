import { Record, Set } from 'immutable';
import { GenericPartial } from './../../../shared/models/Helpers';

export interface IConfigElementMappingRecord {
    fields: Set<string>;
    expressions: Set<string>;
}

const configElementMappingDefaults = {
    fields: Set<string>(),
    expressions: Set<string>()
}

export type ConfigElementMappingParams = GenericPartial<IConfigElementMappingRecord>;

export class ConfigElementMappingRecord extends Record(configElementMappingDefaults) implements IConfigElementMappingRecord {
    constructor(params?: ConfigElementMappingParams) {
        params ? super(params) : super();
    }

    fields: Set<string>;
    expressions: Set<string>;
}