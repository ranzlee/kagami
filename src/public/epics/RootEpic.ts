import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { fetchConfigurationEpic, addConfigurationEpic, updateConfigurationEpic } from "./ConfigurationEpic";

export const rootEpic = combineEpics(
  fetchConfigurationEpic,
  addConfigurationEpic,
  updateConfigurationEpic
);
