import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { getConfigElementDefaults, IConfigElement, ConfigElementRecord } from './../../../shared/models/configuration/elements/IConfigElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { domainDefaults } from "./../../types/immutable/DomainRecord";
import { Map } from 'immutable';

export function configElementLookupReducer(
    configElements: Map<string, ConfigElementRecord> = domainDefaults.configElements,
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            const newElement = getConfigElementDefaults();
            newElement._id = action.elementId;
            newElement.configId = action.configId;
            newElement.configElementType = action.configElementType;

            return configElements.set(newElement._id, new ConfigElementRecord(newElement))

        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            return configElements.setIn([action.id, action.propertyName], action.newValue);

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            return configElements.delete(action.id);

        default:
            return configElements;
    }
}