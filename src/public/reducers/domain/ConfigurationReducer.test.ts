import { ActionTypeKeys } from './../../actions/ActionTypeKeys';
import { configurationReducer } from "./ConfigurationReducer";
import { AddConfigurationSuccessAction, FetchConfigsSuccessAction, UpdateConfigurationAction } from '../../actions/ConfigurationActions';
import { OtherAction } from '../../actions/GeneralActions';
import { IConfigLookup, IConfigElementByTypeLookup } from '../../types/AppStore';
import { Configuration } from '../../../shared/models/configuration/Configuration'
var now = require("performance-now")

const testConfig : Configuration = {
    _id: "13", 
    name: "made-up", 
    description: "made-up"
} 

const testNewConfig : Configuration = {
    _id: "13", 
    name: "", 
    description: ""
} 

describe("Configuration Reducer", () => {
    it("default case", () => {
        const defaultState: IConfigLookup = {};
        const otherAction: OtherAction = { type: ActionTypeKeys.OTHER_ACTION };

        expect(configurationReducer(undefined, otherAction))
            .toEqual(defaultState);
    });

    it("FETCH_CONFIGS_SUCCESS", () => {
        const initialState: IConfigLookup = {};
        const toState: IConfigLookup = {}
        toState[testConfig._id] = testConfig;
        const fetchConfigsSuccessAction : FetchConfigsSuccessAction = {
            type: ActionTypeKeys.FETCH_CONFIGS_SUCCESS,
            configLookup: toState
        };
        
        expect(configurationReducer(initialState, fetchConfigsSuccessAction))
            .toEqual(toState);
    });

    it("ADD_CONFIGURATION_SUCCESS", () => {
        const initialState: IConfigLookup = {};
        const toState : IConfigLookup = {};
        toState[testNewConfig._id] = testNewConfig;
        
        const addConfigsSuccessAction : AddConfigurationSuccessAction = {
            type: ActionTypeKeys.ADD_CONFIGURATION_SUCCESS,
            id: "13"
        };
        
        expect(configurationReducer(initialState, addConfigsSuccessAction))
            .toEqual(toState);
    });

    it("UPDATE PERFORMANCE TEST", () => {
        var configs: IConfigLookup = {}
        for (var i = 0; i < 100000; i++) {
            var indexAsString: string = i.toString();
            var newConfig : Configuration = {
                _id: indexAsString,
                name: 'This is a test name',
                description: 'This is a test description',
            };
            configs[indexAsString] = newConfig;
        }

        const updateAction : UpdateConfigurationAction = {
            type: ActionTypeKeys.UPDATE_CONFIGURATION,
            configId: "13",
            propertyName: "name",
            newValue: "Funky Monkey App",
            oldValue: "Funky Mongoose App"
        };

        const start = now()
        const whoCares = configurationReducer(configs, updateAction);
        const end = now()
        const ms = end - start; 
        console.log(`Update took ${ms.toFixed(3)} milliseconds.`);
        expect(ms).toBeLessThan(100);
    });
});

