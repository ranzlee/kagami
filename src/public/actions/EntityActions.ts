import { IDomain } from './../types/AppStore';
import { ActionTypeKeys } from "./ActionTypeKeys";
import { fetchConfiguration } from "./../apis/ConfigApi"
import { Action, ActionCreator, Dispatch } from 'redux';
import { AppStore } from "./../types/AppStore"
import { ConfigElementType } from '../../shared/models/enums/ConfigElementType';

export type EntityActionTypes =
    | FetchConfigurationAction
    | FetchConfigurationSuccessAction
    | FetchConfigurationErrorAction
    | AddConfigurationAction
    | DeleteConfigurationAction
    | UpdateConfigurationAction
    | AddConfigElementAction
    | UpdateConfigElementAction
    | DeleteConfigElementAction 
    | AjaxSuccessAction;

    
export interface FetchConfigurationAction {
    type: ActionTypeKeys.FETCH_CONFIGURATION,
    id: string
}
export interface FetchConfigurationSuccessAction {
    type: ActionTypeKeys.FETCH_CONFIGURATION_SUCCESS,
    payload: IDomain
}
export interface FetchConfigurationErrorAction {
    type: ActionTypeKeys.FETCH_CONFIGURATION_ERROR,
    payload: any
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
export interface AddConfigurationAction {
    type: ActionTypeKeys.ADD_CONFIGURATION;
    configId: string
}
export interface AddConfigElementAction {
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT;
    configId: string,
    elementId: string,
    configElementType: ConfigElementType
}
export interface UpdateConfigElementAction {
    type: ActionTypeKeys.UPDATE_CONFIG_ELEMENT;
    id: string;
    entityType: ConfigElementType;
    propertyName: string;
    newValue: any;
    oldValue: any;
}
export interface DeleteConfigElementAction {
    type: ActionTypeKeys.DELETE_CONFIG_ELEMENT
    id: string,
}
export interface AjaxSuccessAction {
    type: ActionTypeKeys.AJAX_SUCCESS
}
export const fetchConfig = (id: string) : FetchConfigurationAction => ({
    type: ActionTypeKeys.FETCH_CONFIGURATION,
    id
});
export const fetchConfigSuccess = (domainResult: IDomain): FetchConfigurationSuccessAction => ({
    type: ActionTypeKeys.FETCH_CONFIGURATION_SUCCESS,
    payload: domainResult
});
export const fetchConfigError = (error: any): FetchConfigurationErrorAction => ({
    type: ActionTypeKeys.FETCH_CONFIGURATION_ERROR,
    payload: error
});
export const addConfig = (configId: string): AddConfigurationAction => ({
    type: ActionTypeKeys.ADD_CONFIGURATION,
    configId
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
export const addConfigElement = (configId: string, elementId: string, configElementType: ConfigElementType): AddConfigElementAction => ({
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT,
    configId,
    elementId,
    configElementType
});
export const updateConfigElement = (id: string, entityType: ConfigElementType, propertyName: string, newValue: any, oldValue: any): UpdateConfigElementAction => ({
    type: ActionTypeKeys.UPDATE_CONFIG_ELEMENT,
    id,
    entityType,
    propertyName,
    newValue,
    oldValue
});
export const deleteConfigElement = (id: string): DeleteConfigElementAction => ({
    type: ActionTypeKeys.DELETE_CONFIG_ELEMENT,
    id,
});
export const ajaxSuccess = () : AjaxSuccessAction => ({
    type: ActionTypeKeys.AJAX_SUCCESS
});