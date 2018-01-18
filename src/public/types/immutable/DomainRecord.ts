import { Record, Map } from 'immutable';
import { ConfigurationRecord } from "./../../../shared/models/configuration/Configuration";
import { Tag } from "./../../../shared/models/configuration/Tag";
import { FieldRecord } from './../../../shared/models/configuration/elements/Field';
import { ExpressionRecord } from './../../../shared/models/configuration/elements/Expression';
import { ConfigElementMappingRecord } from './ConfigElementMappingRecord';
import { GenericPartial } from '../../../shared/models/Helpers';

export interface IDomainRecord {
    configurations: Map<string, ConfigurationRecord>;
    configMappings: Map<string, ConfigElementMappingRecord>;
    fields: Map<string, FieldRecord>;
    expressions: Map<string, ExpressionRecord>;
    //tags: List<string>; 
}

const domainDefaults: IDomainRecord = {
    configurations: Map<string, ConfigurationRecord>(),
    configMappings:  Map<string, ConfigElementMappingRecord>(),
    fields: Map<string, FieldRecord>(),
    expressions: Map<string, ExpressionRecord>(),
    //tags: List<string>()
}

type DomainParams = GenericPartial<IDomainRecord>;

export class DomainRecord extends Record(domainDefaults) implements IDomainRecord {
    constructor(params?: DomainParams) {
        params ? super(params) : super();
    }

    configurations: Map<string, ConfigurationRecord>;
    configMappings: Map<string, ConfigElementMappingRecord>;
    fields: Map<string, FieldRecord>;
    expressions: Map<string, ExpressionRecord>;
    //tags: List<string>; 
}