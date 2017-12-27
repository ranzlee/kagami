import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration } from '../../shared/models/configuration/Configuration';
import { IConfigurationElement } from '../../shared/models/configuration/elements/IConfigurationElement';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: Configuration[];
    configElements: IConfigurationElement[];
    tags: Tag[];
}

export interface IAppState {
    currentConfiguration?: string;
}

export interface IUi {

}