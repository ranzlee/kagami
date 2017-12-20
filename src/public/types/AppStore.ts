import { IConfigurationElement } from './../../shared/models/configuration/elements/IConfigurationElement';
import { IConfigElements} from "./../../shared/models/IConfigElements";
import { IEntityLookup} from "./../../shared/models/IEntityLookup";

export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurationElements: IConfigElements;
    entityLookup: IEntityLookup;
}

export interface IAppState {
    currentConfiguration?: string;
}

export interface IUi {

}