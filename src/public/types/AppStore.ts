import { IConfigData } from './../../shared/models/IConfigData';
import { IConfigurationElement } from './../../shared/models/configuration/elements/IConfigurationElement';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: {
        [key: string]: IConfigData;
    }
}

export interface IAppState {
    currentConfiguration?: string;
}

export interface IUi {

}