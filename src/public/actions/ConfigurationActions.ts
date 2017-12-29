import { Configuration } from './../../shared/models/configuration/Configuration';
import { IDomain } from './../types/AppStore';
import { ActionTypeKeys } from "./ActionTypeKeys";
import { fetchConfiguration } from "./../apis/ConfigApi"
import { Action, ActionCreator, Dispatch } from 'redux';
import { AppStore } from "./../types/AppStore"
import { ConfigElementType } from '../../shared/models/enums/ConfigElementType';

export type ConfigurationActionTypes =
    | FetchConfigsAction
    | FetchConfigsSuccessAction
    | FetchConfigsErrorAction

    | AddConfigurationAction
    | AddConfigurationSuccessAction
    | AddConfigurationErrorAction

    | DeleteConfigurationAction
    | UpdateConfigurationAction;


export interface FetchConfigsAction {
    type: ActionTypeKeys.FETCH_CONFIGS;
}
export interface FetchConfigsSuccessAction {
    type: ActionTypeKeys.FETCH_CONFIGS_SUCCESS;
    configs: Configuration[];
}
export interface FetchConfigsErrorAction {
    type: ActionTypeKeys.FETCH_CONFIGS_ERROR;
    payload: any;
}
export interface AddConfigurationAction {
    type: ActionTypeKeys.ADD_CONFIGURATION;
}
export interface AddConfigurationSuccessAction {
    type: ActionTypeKeys.ADD_CONFIGURATION_SUCCESS;
    id: string;
}
export interface AddConfigurationErrorAction {
    type: ActionTypeKeys.ADD_CONFIGURATION_ERROR;
    payload: any;
}

export interface DeleteConfigurationAction {
    type: ActionTypeKeys.DELETE_CONFIGURATION;
    configId: string
}
export interface UpdateConfigurationAction {
    type: ActionTypeKeys.UPDATE_CONFIGURATION;
    configId: string;
    propertyName: string;
    newValue: any;
    oldValue: any;
}


export const fetchConfigs = (): FetchConfigsAction => ({
    type: ActionTypeKeys.FETCH_CONFIGS,
});
export const fetchConfigsSuccess = (configs: Configuration[]) : FetchConfigsSuccessAction => ({
   type: ActionTypeKeys.FETCH_CONFIGS_SUCCESS,
   configs 
});
export const fetchConfigsError = (error: any) : FetchConfigsErrorAction => ({
   type: ActionTypeKeys.FETCH_CONFIGS_ERROR,
   payload: error
});

export const addConfig = (): AddConfigurationAction => ({
    type: ActionTypeKeys.ADD_CONFIGURATION,
});
export const addConfigSuccess = (id: string) : AddConfigurationSuccessAction => ({
   type: ActionTypeKeys.ADD_CONFIGURATION_SUCCESS,
   id 
});
export const addConfigError = (error: any) : AddConfigurationErrorAction => ({
   type: ActionTypeKeys.ADD_CONFIGURATION_ERROR,
   payload: error
});


export const deleteConfig = (configId: string): DeleteConfigurationAction => ({
    type: ActionTypeKeys.DELETE_CONFIGURATION,
    configId
});
export const updateConfig = (configId: string, propertyName: string, newValue: any, oldValue: any): UpdateConfigurationAction => ({
    type: ActionTypeKeys.UPDATE_CONFIGURATION,
    configId,
    propertyName,
    newValue,
    oldValue
});