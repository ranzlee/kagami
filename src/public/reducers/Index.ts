import { combineReducers } from "redux";
import { configElementReducer } from './domain/ConfigElementReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./domain/ConfigurationReducer";
import { configElementMappingReducer } from "./domain/ConfigElementMappingReducer";
import { notificationsReducer } from "./../reducers/appState/NotificationsReducer";

var domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementReducer,
        configElementMapping: configElementMappingReducer
    });

    var notificationsStateReducer = combineReducers( {
        notifications: notificationsReducer
    })


const appStateCombinedReducer = combineReducers(
    {
        appState: appStateReducer,
        notificationState: notificationsStateReducer
    });

export default combineReducers(
    {
        appState: appStateCombinedReducer,
        domain: domainReducer
    });