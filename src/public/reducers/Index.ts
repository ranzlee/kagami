import { combineReducers } from "redux";
import { configElementReducer } from './domain/ConfigElementReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./../reducers/domain/ConfigurationReducer";
import { notificationStateReducer } from "./../reducers/appState/NotificationStateReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementReducer
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