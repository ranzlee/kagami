import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { fetchConfigurationsEpic, addConfigurationEpic, updateConfigurationEpic } from "./ConfigurationEpic";
import { fetchConfigElementsEpic, addConfigElementEpic, updateConfigElementEpic } from "./ConfigElementEpic";

export const rootEpic = combineEpics(
  fetchConfigurationsEpic,
  addConfigurationEpic,
  updateConfigurationEpic,

  fetchConfigElementsEpic,
  addConfigElementEpic,
  updateConfigElementEpic
);
