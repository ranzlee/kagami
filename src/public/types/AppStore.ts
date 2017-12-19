export type AppStore = {
    readonly domain: IDomain,
    readonly appState: IAppState,
    readonly ui: IUi
}

export interface IDomain {
    configurationElements: any; // confiId: {configElementType: [ids]}
    entityLookup: any;
}

export interface IAppState {
    currentConfiguration?: string;
}

export interface IUi {

}