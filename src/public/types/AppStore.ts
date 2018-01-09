import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration, ConfigurationRecord } from './../../shared/models/configuration/Configuration';
import { IConfigElement, ConfigElementRecord } from './../../shared/models/configuration/elements/IConfigElement';
import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';
import { Record, Map } from 'immutable'
import { DomainRecord } from "./immutable/DomainRecord";
import { AppStateRecord } from "./immutable/AppStateRecord";
import { INotificationState, NotificationStateRecord } from './../types/immutable/NotificationStateRecord';

export interface IAppStore {
    domain: DomainRecord;
    appState: AppStateRecord;
}

const defaultAppStore = {
    domain: new DomainRecord(),
    appState: new AppStateRecord()
}

export class AppStoreRecord extends Record(defaultAppStore) implements IAppStore {
    constructor(params?: IAppStore) {
        params ? super(params) : super();
    }

    domain: DomainRecord;
    appState: AppStateRecord;
}

export interface IAppState {
    currentConfiguration?: string;
    notificationState: NotificationStateRecord
}