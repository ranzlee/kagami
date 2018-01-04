import { ActionTypeKeys } from './../../actions/ActionTypeKeys';
import { configurationReducer } from "./ConfigurationReducer";
import { AddConfigurationSuccessAction, FetchConfigsSuccessAction } from '../../actions/ConfigurationActions';
import { OtherAction } from '../../actions/GeneralActions';
import { IConfigLookup } from '../../types/AppStore';
import { Configuration } from '../../../shared/models/configuration/Configuration';

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
});