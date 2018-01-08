import { Record } from 'immutable';

export interface IConfiguration {
    _id: string;
    name: string;
    description: string;
    [key: string]: any;
}

export const configurationDefaults : IConfiguration = {
    _id: "",
    name: "",
    description: "",
}

export class Configuration  {
    _id: string;
    name: string;
    description: string;
    [key: string]: any;

    public validate() : string[] {
        return validate(this);
    }
}

function validate(configuration: IConfiguration) : string[] {
    var msgs : string[] = [];
    if (!configuration.name) {
        msgs.push("A Name must be provided for the Configuration");
    }
    return msgs;
}

export class ConfigurationRecord extends Record(configurationDefaults) implements IConfiguration {
    constructor(params?: IConfiguration) {
        params ? super(params) : super();
    }

    _id: string;
    name: string;
    description: string;
    [key: string]: any;

    public validate() : string[] {
        return validate(this);
    }
}