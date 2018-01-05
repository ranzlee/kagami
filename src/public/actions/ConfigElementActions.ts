import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from "./../actions/ActionTypeKeys";
import { IDomain } from '../types/AppStore';
import { IConfigurationElement } from '../../shared/models/configuration/elements/IConfigurationElement';


export type ConfigElementActionTypes =
    | FetchConfigElementsAction
    | FetchConfigElementsSuccessAction
    | FetchConfigElementsErrorAction

    | AddConfigElementAction
    | AddConfigElementSuccessAction

    | UpdateConfigElementAction
    | DeleteConfigElementAction;

export interface FetchConfigElementsAction {
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS,
    configId: string
}
export interface FetchConfigElementsSuccessAction {
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS,
    configId: string;
    configElements: IConfigurationElement[]
}
export interface FetchConfigElementsErrorAction {
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS_ERROR,
    payload: any
}

export interface AddConfigElementAction {
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT;
    configId: string,
    configElementType: ConfigElementType
}
export interface AddConfigElementSuccessAction {
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS,
    configId: string,
    configElementType: ConfigElementType,
    elementId: string
}

export interface UpdateConfigElementAction {
    type: ActionTypeKeys.UPDATE_CONFIG_ELEMENT;
    id: string;
    configElementType: ConfigElementType;
    propertyName: string;
    newValue: any;
    oldValue: any;
}
export interface DeleteConfigElementAction {
    type: ActionTypeKeys.DELETE_CONFIG_ELEMENT
    id: string,
}

export const fetchConfigElements = (configId: string): FetchConfigElementsAction => ({
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS,
    configId
});
export const fetchConfigElementsSuccess = (configElements: IConfigurationElement[], configId: string): FetchConfigElementsSuccessAction => ({
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS,
    configId,
    configElements: configElements
});
export const fetchConfigElementsError = (error: any): FetchConfigElementsErrorAction => ({
    type: ActionTypeKeys.FETCH_CONFIG_ELEMENTS_ERROR,
    payload: error
});

export const addConfigElement = (configId: string, configElementType: ConfigElementType): AddConfigElementAction => ({
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT,
    configId,
    configElementType
});
export const addConfigElementSuccess = (configId: string, elementId: string, configElementType: ConfigElementType): AddConfigElementSuccessAction => ({
    type: ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS,
    configId,
    elementId,
    configElementType
});


export const updateConfigElement = (id: string, configElementType: ConfigElementType, propertyName: string, newValue: any, oldValue: any): UpdateConfigElementAction => ({
    type: ActionTypeKeys.UPDATE_CONFIG_ELEMENT,
    id,
    configElementType,
    propertyName,
    newValue,
    oldValue
});
export const deleteConfigElement = (id: string): DeleteConfigElementAction => ({
    type: ActionTypeKeys.DELETE_CONFIG_ELEMENT,
    id,
});