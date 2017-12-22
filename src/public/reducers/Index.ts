import { combineReducers } from "redux";
import { configurationElementReducer } from './domain/ConfigurationElementReducer';
import { entityLookupReducer } from './domain/EntityLookupReducer';

import { appStateReducer } from "./appState/AppStateReducer";

var configDataSubReducers = combineReducers(
    {
        components: configurationElementReducer,
        entities: entityLookupReducer
    });

var domainReducer = combineReducers(
    {
        configData: configDataSubReducers,
        configDataReducer
    });

export default combineReducers(
    {
        appState: appStateReducer,
        domain: domainReducer
    });