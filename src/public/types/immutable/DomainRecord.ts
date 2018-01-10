import { Record, Map, List } from 'immutable';
import { ConfigurationRecord } from "./../../../shared/models/configuration/Configuration";
import { Tag } from "./../../../shared/models/configuration/Tag";
import { ConfigElementRecord } from './../../../shared/models/configuration/elements/IConfigElement';
import { ConfigElementsByTypeRecord } from "./../../types/immutable/ConfigElementsByTypeRecord";

export interface IDomainRecord {
    configurations: Map<string, ConfigurationRecord>;
    configElements: Map<string, ConfigElementRecord>;
    configElementMapping: Map<string, ConfigElementsByTypeRecord>
    //tags: List<string>; 
}

const domainDefaults = {
    configurations: Map<string, ConfigurationRecord>(),
    configElements: Map<string, ConfigElementRecord>(),
    configElementMapping: Map<string, ConfigElementsByTypeRecord>(),
    //tags: List<string>()
}

export class DomainRecord extends Record(domainDefaults) implements IDomainRecord {
    constructor(params?: IDomainRecord) {
        params ? super(params) : super();
    }
    
    configurations: Map<string, ConfigurationRecord>;
    configElements: Map<string, ConfigElementRecord>;
    configElementMapping: Map<string, ConfigElementsByTypeRecord>
    //tags: List<string>; 
}