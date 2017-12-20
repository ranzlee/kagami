import { ConfigElementType } from './../../shared/models/configuration/elements/ConfigElementType';
import { ActionTypeKeys } from "./ActionTypeKeys";


export type EntityActionTypes =
    | AddConfigurationAction
    | AddEntityAction
    | UpdateEntityAction
    | DeleteEntityAction;

export interface AddConfigurationAction {
    type: ActionTypeKeys.ADD_CONFIGURATION;
    configId: string
}
export interface AddEntityAction {
    type: ActionTypeKeys.ADD_CONFIG_ENTITY;
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

export const addConfig = (configId: string) : AddConfigurationAction => ({
    type: ActionTypeKeys.ADD_CONFIGURATION,
    configId
});
export const addEntity = (configId: string, entityId: string, entityType: ConfigElementType): AddEntityAction => ({
    type: ActionTypeKeys.ADD_CONFIG_ENTITY,
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