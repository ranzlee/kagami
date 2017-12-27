import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration } from '../../shared/models/configuration/Configuration';
import { IConfigurationElement } from '../../shared/models/configuration/elements/IConfigurationElement';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: {[key: string] : Configuration};
    configElements: {[key: string] : IConfigurationElement};
    tags: Tag[];
}

export interface IAppState {
    currentConfiguration?: string;
}

export interface IUi {

}