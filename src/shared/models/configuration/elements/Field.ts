import { Record } from 'immutable';
import { FieldType } from './../../enums/FieldType';
import { ConfigElementRecord, IConfigElement, getConfigElementDefaults } from './IConfigElement';
import { ConfigElementType } from './../../enums/ConfigElementType';
import { GenericPartial } from './../../Helpers';

export interface IField extends IConfigElement {
    type?: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;
}

function getFieldDefaults(): IField {
    return {
        ...getConfigElementDefaults(),
        type: undefined,
        displayExpression: "",
        readonlyExpression: "",
        defaultValueExpression: ""
    };
}

export type FieldParams = GenericPartial<IField>;

export class FieldRecord extends Record(getFieldDefaults()) implements IField {
    constructor(params?: FieldParams) {
        params ? super(params) : super();
    }

    _id: string;
    configId: string;
    configElementType?: ConfigElementType;
    name: string;
    description: string;
    dependencies: string[];
    tags: string[];

    type: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    [key: string]: any;

    public static asFieldRecord(configElementRecord: ConfigElementRecord) : FieldRecord {
        return configElementRecord as FieldRecord;
    }
}