export class Configuration {
    _id: string;
    name: string;
    description: string;
    [key: string]: any;
    complex?: any
}

export const configurationDefaults : Configuration = {
    _id: "",
    name: "",
    description: "",
}