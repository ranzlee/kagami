import { combineReducers } from "redux";
import { configElementReducer } from './domain/ConfigElementReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./../reducers/domain/ConfigurationReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementReducer
    });

export default combineReducers(
    {
        appState: appStateReducer,
        domain: domainReducer
    });