import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration, ConfigurationRecord } from './../../shared/models/configuration/Configuration';
import { IConfigElement, ConfigElementRecord } from './../../shared/models/configuration/elements/IConfigElement';
import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';
import { Record, Map } from 'immutable';
import { DomainRecord } from "./immutable/DomainRecord"

export interface IAppStore {
    domain: DomainRecord;
    appState: IAppState;
}

const defaultAppStore = {
    domain: new DomainRecord(),
    appState: {}
}

export class AppStoreRecord extends Record(defaultAppStore) implements IAppStore {
    constructor(params?: IAppStore) {
        params ? super(params) : super();
    }

    domain: DomainRecord;
    appState: IAppState;
}

export interface IAppState {
    currentConfiguration?: string;
}