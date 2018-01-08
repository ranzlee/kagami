import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration, ConfigurationRecord } from './../../shared/models/configuration/Configuration';
import { IConfigurationElement } from './../../shared/models/configuration/elements/IConfigurationElement';
import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';
import { Record, Map } from 'immutable'
import { Notification } from './../../shared/models/Notification';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: Map<string, ConfigurationRecord>;
    configElements: IConfigElementLookup;
    configElementMapping: IConfigElementMapping
    tags: Tag[];
}

export interface IConfigElementLookup {
    [key: string] : IConfigurationElement;
}

export interface IConfigElementMapping {
    [key: string] : IConfigElementByTypeLookup; // Key is configuration id
}

export interface IConfigElementByTypeLookup {
    [key: string] : string[] // Key - ConfigElementType and values are all config element ids of that type
}

export interface IAppState {
    currentConfiguration?: string;
    notificationState: INotificationState
}

export interface INotificationState {
    notifications: Array<Notification>;
}

export interface IUi {

}