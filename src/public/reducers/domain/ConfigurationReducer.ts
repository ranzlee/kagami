import { ConfigurationItem } from './../../components/configurations/ConfigurationItem';
import { Configuration } from './../../../shared/models/configuration/Configuration';
import { ConfigurationActionTypes } from './../../actions/ConfigurationActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { OtherAction } from '../../actions/GeneralActions';
import { ConfigurationRecord } from '../../types/immutable/ConfigurationRecord';
import { Map, Record } from "immutable";

function getDefault(): Map<string, ConfigurationRecord> {

    const records: ConfigurationRecord[] = [];
    for (var i = 0; i < 1000000; i++) {
        var indexAsString: string = i.toString();
        var newConfig: Configuration = {
            _id: indexAsString,
            name: 'This is a test name',
            description: 'This is a tet description',
            complex: {
                item1: {
                    test: "a",
                    array: [1, 2, 3, 4, 5]
                },
                item2: {
                    test: false,
                    number: 13
                }
            }
        };
        records.push(new ConfigurationRecord(newConfig));

    }
    var configs: Map<string, ConfigurationRecord> = configs = Map(records.map((item, index) => ([item._id, item])));

    var config: Configuration = {
        _id: "5a4e5fdd20006f00d17b5a5d",
        name: "Test 2",
        description: "Funny",
        complex: undefined
    };

    var configRecord = new ConfigurationRecord(config);
    return configs.set(config._id, configRecord);
}


export function configurationReducer(
    configurations: Map<string, ConfigurationRecord> = getDefault(),
    action: ConfigurationActionTypes | OtherAction) {
    switch (action.type) {
        case ActionTypeKeys.FETCH_CONFIGS_SUCCESS:
            return action.configs;
        case ActionTypeKeys.ADD_CONFIGURATION_SUCCESS:
            return {
                ...configurations,
                [action.id]: {
                    _id: action.id,
                    name: '',
                    description: ''
                }
            };
        case ActionTypeKeys.UPDATE_CONFIGURATION:
            return configurations.setIn([action.configId, action.propertyName], action.newValue);

        default:
            return configurations;
    }
}