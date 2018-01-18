import { combineReducers } from "redux-immutable";
import { createStore } from "redux";
import { fieldReducer } from "./domain/FieldReducer";
import { expressionReducer } from "./domain/ExpressionReducer";

import { appStateReducer } from "./appState/AppStateReducer";
import { configurationReducer } from "./domain/ConfigurationReducer";
import { notificationsReducer } from "./../reducers/appState/NotificationsReducer";
import { configMappingsReducer } from "./domain/ConfigMappingsReducer";

const domainReducer = combineReducers({
  configurations: configurationReducer,
  configMappings: configMappingsReducer,
  fields: fieldReducer,
  expressions: expressionReducer
});

const notificationsStateReducer = combineReducers({
  notifications: notificationsReducer
});

const appStateCombinedReducer = combineReducers({
  currentConfiguration: appStateReducer,
  notificationState: notificationsStateReducer
});

export default combineReducers({
  appState: appStateCombinedReducer,
  domain: domainReducer
});
