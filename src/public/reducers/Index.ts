import { combineReducers } from "redux";
import { configElementLookupReducer } from './domain/ConfigElementLookupReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./domain/ConfigurationReducer";
import { configElementMappingReducer } from "./domain/ConfigElementMappingReducer";
import { notificationStateReducer } from "./../reducers/appState/NotificationStateReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementLookupReducer,
        configElementMapping: configElementMappingReducer
    });


const appStateCombinedReducer = combineReducers(
    {
        appState: appStateReducer,
        notificationState: notificationStateReducer
    });

export default combineReducers(
    {
        appState: appStateCombinedReducer,
        domain: domainReducer
    });