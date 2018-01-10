import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import { configElementReducer } from './domain/ConfigElementReducer';

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./domain/ConfigurationReducer";
import { configElementMappingReducer } from "./domain/ConfigElementMappingReducer";
import { notificationsReducer } from "./../reducers/appState/NotificationsReducer";

const domainReducer = combineReducers(
    {
        configurations: configurationReducer,
        configElements: configElementReducer,
        configElementMapping: configElementMappingReducer
    });

const notificationsStateReducer = combineReducers({
    notifications: notificationsReducer
})

const appStateCombinedReducer = combineReducers(
    {
        currentConfiguration: appStateReducer,
        notificationState: notificationsStateReducer
    });

export default combineReducers(
    {
        appState: appStateCombinedReducer,
        domain: domainReducer
    });