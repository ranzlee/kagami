import { combineReducers } from "redux";

import { appStateReducer } from "./appState/AppStateReducer";

import { configurationReducer } from "reducers/domain/ConfigurationReducer";
import { entityLookupReducer } from "reducers/domain/EntityLookupReducer";

var domainReducer = combineReducers({ configurations: configurationReducer , enittyLookup: entityLookupReducer });

export default combineReducers({ appState: appStateReducer, domain: domainReducer });