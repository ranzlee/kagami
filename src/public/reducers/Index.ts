import { combineReducers } from "redux";
import { configurationElementReducer } from './domain/ConfigurationElementReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./../reducers/domain/ConfigurationReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configurationElementReducer
    });

export default combineReducers(
    {
        appState: appStateReducer,
        domain: domainReducer
    });