import { ConfigurationItem } from './../../components/configurations/ConfigurationItem';
import { Configuration, ConfigurationRecord, configurationDefaults } from './../../../shared/models/configuration/Configuration';
import { ConfigurationActionTypes } from './../../actions/ConfigurationActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { OtherAction } from '../../actions/GeneralActions';
import { Map, Record } from "immutable";

export function configurationReducer(
    configurations: Map<string, ConfigurationRecord> = Map<string, ConfigurationRecord>(),
    action: ConfigurationActionTypes | OtherAction) {
    switch (action.type) {
        case ActionTypeKeys.FETCH_CONFIGS_SUCCESS:
            return Map(action.configs.map(
                (item, index) => ([item._id, new ConfigurationRecord(item)])));

        case ActionTypeKeys.UPDATE_CONFIGURATION:
            return configurations.setIn([action.configId, action.propertyName], action.newValue);

        case ActionTypeKeys.ADD_CONFIGURATION_SUCCESS:
            var newConfig = configurationDefaults;
            newConfig._id = action.id;
            return configurations.set(action.id, new ConfigurationRecord(newConfig))

        default:
            return configurations;
    }
}