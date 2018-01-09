import { Record, Set } from 'immutable';

export interface IConfigElementsByType {
    expression: Set<string>;
    field: Set<string>;
}

const defaultConfigElementsByType: IConfigElementsByType = {
    expression: Set<string>(),
    field: Set<string>()
}

export class ConfigElementsByTypeRecord extends Record(defaultConfigElementsByType) implements IConfigElementsByType {
    expression: Set<string>;
    field: Set<string>;
}