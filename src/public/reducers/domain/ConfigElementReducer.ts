import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { IConfigurationElement } from './../../../shared/models/configuration/elements/IConfigurationElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

export function configElementReducer(configurationElements: { [key: string]: IConfigurationElement } = {}, action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT:
            const newElement = {
                id: action.elementId,
                configId: action.configId,
                configElementType: action.configElementType,
                name: 'New',
                dependencies: new Array<string>(),
                tags: new Array<string>()
            };
            return { ...configurationElements, [action.elementId]: newElement }
        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            const copy = { ...configurationElements };
            copy[action.id] = { ...copy[action.id] };
            copy[action.id][action.propertyName] = action.newValue;
            return copy;
        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            const deleteCopy = { ...configurationElements };
            delete deleteCopy[action.id];
            return deleteCopy;
        default:
            return configurationElements;
    }
}