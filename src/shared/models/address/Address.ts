import { Record } from 'immutable';
import { GenericPartial } from './../../models/Helpers';

export interface IAddress {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipcode: string;
    [key: string]: any;
}

export function getAddressDefaults(): IAddress {
    return {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: ''
    }
}

export type AddressParams = GenericPartial<IAddress>;

export class AddressRecord extends Record(getAddressDefaults()) implements IAddress {
    constructor(params?: AddressParams) {
        params ? super(params) : super();
    }

    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipcode: string;
    [key: string]: any;
}