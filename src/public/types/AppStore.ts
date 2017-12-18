export type App = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurations: string[];
    configurationElements: any;
    tags: string[];
    entityLookup: any;
}

export interface IAppState {
    currentConfiguration: string;
}

export interface IUi {

}