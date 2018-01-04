import { IConfigLookup } from './../../types/AppStore';
import { ConfigurationItem } from './../../components/configurations/ConfigurationItem';
import { Configuration } from './../../../shared/models/configuration/Configuration';
import { ConfigurationActionTypes } from './../../actions/ConfigurationActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { OtherAction } from '../../actions/GeneralActions';

export function configurationReducer(
    configurations: IConfigLookup = {}, 
    action: ConfigurationActionTypes | OtherAction) {
    switch (action.type) {
        case ActionTypeKeys.FETCH_CONFIGS_SUCCESS:
            return action.configLookup;
        case ActionTypeKeys.ADD_CONFIGURATION_SUCCESS:
            return {
                ...configurations,
                [action.id]: {
                    _id: action.id,
                    name: '',
                    description: ''
                }
            };
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