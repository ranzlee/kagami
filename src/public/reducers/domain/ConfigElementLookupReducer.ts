import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { ConfigElementParams, IConfigElement, ConfigElementRecord } from './../../../shared/models/configuration/elements/IConfigElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { Map } from 'immutable';

export function configElementLookupReducer(
    configElements: Map<string, ConfigElementRecord> = Map<string, ConfigElementRecord>(),
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            const newElement: ConfigElementParams = {
                _id: action.elementId,
                configId: action.configId,
                configElementType: action.configElementType
            };

            return configElements.set(newElement._id, new ConfigElementRecord(newElement))

        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            return configElements.setIn([action.id, action.propertyName], action.newValue);

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            return configElements.delete(action.id);

        default:
            return configElements;
    }
}