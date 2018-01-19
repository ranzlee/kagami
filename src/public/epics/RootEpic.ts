import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { fetchConfigurationsEpic, addConfigurationEpic, updateConfigurationEpic } from "./ConfigurationEpic";
import { fetchConfigElementsEpic, addConfigElementEpic, updateConfigElementEpic } from "./ConfigElementEpic";
import { updateFieldAddressEpic, addFieldAddressEpic } from './FieldEpic';

export const rootEpic = combineEpics(
  fetchConfigurationsEpic,
  addConfigurationEpic,
  updateConfigurationEpic,

  fetchConfigElementsEpic,
  addConfigElementEpic,
  updateConfigElementEpic,

  addFieldAddressEpic,
  updateFieldAddressEpic
);
