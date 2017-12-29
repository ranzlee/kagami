import { Config } from './../../components/configurations/Config';
import { Configuration } from './../../../shared/models/configuration/Configuration';
import { ConfigurationActionTypes } from './../../actions/ConfigurationActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

export function configurationReducer(configurations: { [key: string]: Configuration } = {}, action: ConfigurationActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIGURATION:
            return configurations;
        case ActionTypeKeys.ADD_CONFIGURATION_SUCCESS:
            return { ...configurations, [action.id]: { _id: action.id } };
        case ActionTypeKeys.DELETE_CONFIGURATION:
            const deleteCopy = { ...configurations };
            delete deleteCopy[action.configId];
            return deleteCopy;
        case ActionTypeKeys.UPDATE_CONFIGURATION:
            let copy = { ...configurations };
            copy[action.configId] = { ...copy[action.configId] };
            copy[action.configId][action.propertyName] = action.newValue;
            return copy;
        default:
            return configurations;
    }
}