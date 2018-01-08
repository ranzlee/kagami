import { ActionTypeKeys } from './../../actions/ActionTypeKeys';
import { configurationReducer } from "./ConfigurationReducer";
import { AddConfigurationSuccessAction, FetchConfigsSuccessAction, UpdateConfigurationAction } from '../../actions/ConfigurationActions';
import { OtherAction } from '../../actions/GeneralActions';
import { IConfiguration, ConfigurationRecord } from '../../../shared/models/configuration/Configuration';
import { Map } from "immutable";

var now = require("performance-now")

const testConfig: IConfiguration = {
    _id: "13",
    name: "made-up",
    description: "made-up"
}

const testNewConfig: IConfiguration = {
    _id: "13",
    name: "",
    description: ""
}

const defaultEmptyState: Map<string, ConfigurationRecord> = Map<string, ConfigurationRecord>();


describe("Configuration Reducer", () => {
    it("default case", () => {
        const otherAction: OtherAction = { type: ActionTypeKeys.OTHER_ACTION };

        expect(configurationReducer(undefined, otherAction))
            .toEqual(defaultEmptyState);
    });

    it("FETCH_CONFIGS_SUCCESS", () => {
        const toState: Map<string, ConfigurationRecord> = Map<string, ConfigurationRecord>(
            [
                [testConfig._id, new ConfigurationRecord(testConfig)]
            ]
        );

        const fetchConfigsSuccessAction: FetchConfigsSuccessAction = {
            type: ActionTypeKeys.FETCH_CONFIGS_SUCCESS,
            configs: [testConfig]
        };

        expect(configurationReducer(defaultEmptyState, fetchConfigsSuccessAction))
            .toEqual(toState);
    });

    it("ADD_CONFIGURATION_SUCCESS", () => {
        const toState: Map<string, ConfigurationRecord> = Map<string, ConfigurationRecord>(
            [
                [testNewConfig._id, new ConfigurationRecord(testNewConfig)]
            ]
        );

        const addConfigsSuccessAction: AddConfigurationSuccessAction = {
            type: ActionTypeKeys.ADD_CONFIGURATION_SUCCESS,
            id: testNewConfig._id
        };

        expect(configurationReducer(defaultEmptyState, addConfigsSuccessAction))
            .toEqual(toState);
    });

    it("UPDATE PERFORMANCE TEST", () => {

        var mapArray = [];
        const oneMillion = 1000000;
        for (var i = 0; i < oneMillion; i++) {
            var indexAsString: string = i.toString();
            var newConfig: IConfiguration = {
                _id: indexAsString,
                name: 'This is a test name',
                description: 'This is a test description',
            };
            mapArray.push([newConfig._id, new ConfigurationRecord(newConfig)]);
        }
        const map = Map<string, ConfigurationRecord>(mapArray);

        const updateAction: UpdateConfigurationAction = {
            type: ActionTypeKeys.UPDATE_CONFIGURATION,
            configId: "13",
            propertyName: "name",
            newValue: "Funky Monkey App",
            oldValue: "Funky Mongoose App"
        };

        const start = now()
        const whoCares = configurationReducer(map, updateAction);
        const end = now()
        const ms = end - start;
        console.log(`Update took ${ms.toFixed(3)} milliseconds.`);
        expect(ms).toBeLessThan(1);
    });
});
