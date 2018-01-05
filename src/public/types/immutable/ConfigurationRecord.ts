import { configurationDefaults, Configuration } from "../../../shared/models/configuration/Configuration";
import { Record } from 'immutable';

export class ConfigurationRecord extends Record(configurationDefaults) implements Configuration {
    constructor(params?: Configuration) {
        params ? super(params) : super();
    }

    _id: string;
    name: string;
    description: string;
    [key: string]: any
}