import { Record } from 'immutable';

export class Configuration {
    _id: string;
    name: string;
    description: string;
    [key: string]: any;
}

export const configurationDefaults : Configuration = {
    _id: "",
    name: "",
    description: "",
}

export class ConfigurationRecord extends Record(configurationDefaults) implements Configuration {
    constructor(params?: Configuration) {
        params ? super(params) : super();
    }

    _id: string;
    name: string;
    description: string;
    [key: string]: any
}