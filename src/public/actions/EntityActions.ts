import { IDomain } from './../types/AppStore';
import { FetchConfigurationAction, FetchConfigurationSuccessAction } from './EntityActions';
import { ActionTypeKeys } from "./ActionTypeKeys";
import { fetchConfiguration } from "./../apis/ConfigApi"
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStore } from "./../types/AppStore"
import { ConfigElementType } from '../../shared/models/enums/ConfigElementType';

export type EntityActionTypes =
    | FetchConfigurationAction
    | FetchConfigurationSuccessAction
    | FetchConfigurationErrorAction
    | AddConfigurationAction
    | DeleteConfigurationAction
    | AddEntityAction
    | UpdateEntityAction
    | DeleteEntityAction;


export interface FetchConfigurationAction {
    type: ActionTypeKeys.FETCH_CONFIGURATION
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
export interface AddConfigurationAction {
    type: ActionTypeKeys.ADD_CONFIGURATION;
    configId: string
}
export interface AddEntityAction {
    type: ActionTypeKeys.ADD_ENTITY;
    configId: string,
    entityId: string,
    entityType: ConfigElementType
}
export interface UpdateEntityAction {
    type: ActionTypeKeys.UPDATE_ENTITY;
    id: string;
    entityType: ConfigElementType;
    propertyName: string;
    newValue: any;
    oldValue: any;
}
export interface DeleteEntityAction {
    type: ActionTypeKeys.DELETE_ENTITY
    id: string,
    entityType: ConfigElementType
}

export const fetchConfig: any = async (id: string) => {
    return async (dispatch: Dispatch<AppStore>): Promise<any> => {
        try {
            const domainResult = await fetchConfiguration(id);
            return dispatch(fetchConfigSuccess(domainResult));
        }
        catch (e) {
            return dispatch(fetchConfigError(e));
        }
    }
};
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
export const addEntity = (configId: string, entityId: string, entityType: ConfigElementType): AddEntityAction => ({
    type: ActionTypeKeys.ADD_ENTITY,
    configId,
    entityId,
    entityType
});
export const updateEntity = (id: string, entityType: ConfigElementType, propertyName: string, newValue: any, oldValue: any): UpdateEntityAction => ({
    type: ActionTypeKeys.UPDATE_ENTITY,
    id,
    entityType,
    propertyName,
    newValue,
    oldValue
});
export const deleteEntity = (id: string, entityType: ConfigElementType): DeleteEntityAction => ({
    type: ActionTypeKeys.DELETE_ENTITY,
    id,
    entityType
});