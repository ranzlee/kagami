import { EntityActionTypes } from './../../actions/EntityActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

export function configurationElementReducer(configurationElements: any = {}, action: EntityActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIGURATION:
            return { ...configurationElements, [action.configId]: {} };
        case ActionTypeKeys.ADD_CONFIG_ENTITY:
            var copy = { ...configurationElements };
            var config = { ...copy[action.configId] }
            var elements = { ...config[action.entityType] } || {}
            elements = elements.concat(action.entityId);
            copy[action.configId] = config;
            copy[action.configId][action.entityType] = elements;
            return copy;
        default:
            return configurationElements;
    }
}