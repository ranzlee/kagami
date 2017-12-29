import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { fetchConfigurationsEpic, addConfigurationEpic, updateConfigurationEpic } from "./ConfigurationEpic";
import { fetchConfigElementsEpic } from "./ConfigElementEpic";

export const rootEpic = combineEpics(
  fetchConfigurationsEpic,
  fetchConfigElementsEpic,
  addConfigurationEpic,
  updateConfigurationEpic
);
