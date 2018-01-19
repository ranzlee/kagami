import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { Map, List } from 'immutable';
import { FieldRecord, FieldParams, IField } from './../../../shared/models/configuration/elements/Field';
import { AddressRecord } from '../../../shared/models/address/Address';

export function fieldReducer(
    fields: Map<string, FieldRecord> = Map<string, FieldRecord>(),
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            if (action.configElementType !== ConfigElementType.field) return fields;
            const newElement: FieldParams = {
                _id: action.elementId,
                configId: action.configId,
                configElementType: action.configElementType
            };
            return fields.set(newElement._id, new FieldRecord(newElement));

        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            if (action.configElementType !== ConfigElementType.field) return fields;
            return fields.setIn([action.id, action.propertyName], action.newValue);

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            return fields.mergeDeep(Map<string, FieldRecord>(
                action.configElements
                    .filter(item => item.configElementType === ConfigElementType.field)
                    .map(item => {
                        const fieldParams = item as FieldRecord;
                        fieldParams.addresses = fieldParams.addresses
                            ? fieldParams.addresses = List<AddressRecord>(fieldParams.addresses.map(i => new AddressRecord(i)))
                            : fieldParams.addresses = List<AddressRecord>();
                        return fieldParams;
                    })
                    .map(fieldRecordParams => [fieldRecordParams._id, new FieldRecord(fieldRecordParams)])));

        case ActionTypeKeys.ADD_FIELD_ADDRESS:
            return fields.updateIn([action.fieldId, "addresses"], (list) => list.push(new AddressRecord()));

        case ActionTypeKeys.UPDATE_FIELD_ADDRESS:
            return fields.setIn([action.fieldId, "addresses", action.addressIndex, action.propertyName], action.newValue);


        default:
            return fields;
    }
}