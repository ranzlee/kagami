import { Record, List } from 'immutable';
import { FieldType } from './../../enums/FieldType';
import { IConfigElement, getConfigElementDefaults } from './IConfigElement';
import { ConfigElementType } from './../../enums/ConfigElementType';
import { GenericPartial } from './../../Helpers';
import { IAddress, AddressRecord } from './../../address/Address';

export interface IField extends IConfigElement {
    type?: FieldType;
    displayExpression: string;
    readonlyExpression: string;
    defaultValueExpression: string;
    addresses: IAddress[];
    [key: string]: any;
}

function getFieldDefaults(): IField {
    return {
        ...getConfigElementDefaults(),
        type: undefined,
        displayExpression: "",
        readonlyExpression: "",
        defaultValueExpression: "",
        addresses: []
    };
}

export type FieldParams = GenericPartial<FieldRecord>;


export class FieldRecord extends Record(getFieldDefaults()) {
    constructor(params?: any) {
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

    addresses: List<AddressRecord>;

    [key: string]: any;
}