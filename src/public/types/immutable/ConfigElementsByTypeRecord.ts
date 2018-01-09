import { Record, List } from 'immutable';

export interface IConfigElementsByType {
    expressions: List<string>;
    fields: List<string>;
}

const defaultConfigElementsByType: IConfigElementsByType = {
    expressions: List<string>(),
    fields: List<string>()
}

export class ConfigElementsByTypeRecord extends Record(defaultConfigElementsByType) implements IConfigElementsByType {
    expressions: List<string>;
    fields: List<string>;
}