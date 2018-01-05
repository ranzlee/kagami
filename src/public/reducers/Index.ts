import { combineReducers } from "redux";
import { configElementLookupReducer } from './domain/ConfigElementLookupReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./domain/ConfigurationReducer";
import { configElementMappingReducer } from "./domain/ConfigElementMappingReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementLookupReducer,
        configElementMapping: configElementMappingReducer
    });

export default combineReducers(
    {
        appState: appStateReducer,
        domain: domainReducer
    });