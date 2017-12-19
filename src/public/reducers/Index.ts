import { configurationElementReducer } from './domain/ConfigurationElementReducer';
import { entityLookupReducer } from './domain/EntityLookupReducer';
import { combineReducers } from "redux";

import { appStateReducer } from "./appState/AppStateReducer";



var domainReducer = combineReducers({ configurationElements: configurationElementReducer , entityLookup: entityLookupReducer });

export default combineReducers({ appState: appStateReducer, domain: domainReducer });