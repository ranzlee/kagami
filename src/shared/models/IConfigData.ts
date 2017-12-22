export interface IConfigData {
    configId: string;
    currentEventId: number;
    entities: {
        [key: string] : any
    },
    components: {
        [key: string] : string[]
    }
}