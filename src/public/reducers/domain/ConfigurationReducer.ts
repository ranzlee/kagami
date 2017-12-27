import { Config } from './../../components/configurations/Config';
import { Configuration } from './../../../shared/models/configuration/Configuration';
import { EntityActionTypes } from './../../actions/EntityActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

export function configurationReducer(configurations: { [key: string]: Configuration } = {}, action: EntityActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIGURATION:
            return { ...configurations, [action.configId]: { id: action.configId, currentChangeEvent: 1 } };
        case ActionTypeKeys.DELETE_CONFIGURATION:
            const deleteCopy = { ...configurations };
            delete deleteCopy[action.configId];
            return deleteCopy;
        case ActionTypeKeys.UPDATE_CONFIGURATION:
            let copy = { ...configurations };
            copy[action.configId]  = { ...copy[action.configId] };
            copy[action.configId][action.propertyName] = action.newValue;
            return copy;
        default:
            return configurations;
    }
}