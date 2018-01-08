import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration } from '../../shared/models/configuration/Configuration';
import { IConfigurationElement } from '../../shared/models/configuration/elements/IConfigurationElement';
import { Notification } from './../../shared/models/Notification';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: IConfigLookup;
    configElements: IConfigElementLookup;
    tags: Tag[];
}

export interface IConfigLookup {
    [key: string]: Configuration
}

export interface IConfigElementLookup {
    [key: string]: IConfigurationElement;
}

export interface IAppState {
    currentConfiguration?: string;
    fetchedConfigs: string[];
    notificationState: INotificationState
}

export interface INotificationState {
    notifications: Array<Notification>;
}

export interface IUi {

}