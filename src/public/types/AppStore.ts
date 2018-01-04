import { Tag } from './../../shared/models/configuration/Tag';
import { Configuration } from './../../shared/models/configuration/Configuration';
import { IConfigurationElement } from './../../shared/models/configuration/elements/IConfigurationElement';
import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: IConfigLookup;
    configElements: IConfigElementLookup;
    configElementMapping: IConfigElementMapping
    tags: Tag[];
}

export interface IConfigLookup {
    [key: string] : Configuration
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
    fetchedConfigs: string[];
}

export interface IUi {

}