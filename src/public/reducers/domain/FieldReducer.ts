import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { Map, List } from 'immutable';
import { FieldRecord, FieldParams } from './../../../shared/models/configuration/elements/Field';
import { AddressRecord } from '../../../shared/models/address/Address';

export function fieldReducer(
    fields: Map<string, FieldRecord> = Map<string, FieldRecord>(),
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            const newElement: FieldParams = {
                _id: action.elementId,
                configId: action.configId,
                configElementType: action.configElementType
            };
            return fields.set(newElement._id, new FieldRecord(newElement));

        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            return fields.setIn([action.id, action.propertyName], action.newValue);

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            return fields.delete(action.id);

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            return fields.mergeDeep(Map<string, FieldRecord>(
                action.configElements
                    .filter(item => item.configElementType === ConfigElementType.field)
                    .map(item => [item._id, new FieldRecord(item)])));

        case ActionTypeKeys.ADD_FIELD_ADDRESS:
            const params: FieldParams = {
                _id: action.fieldElementId,
                addresses: List<AddressRecord>(new AddressRecord())
            }
            const newFieldRecord = new FieldRecord(params);
            return fields.mergeDeep(Map<string, FieldRecord>([[action.fieldElementId, newFieldRecord]]));

        default:
            return fields;
    }
}