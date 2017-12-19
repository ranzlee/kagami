import { ActionTypeKeys } from "actions/ActionTypeKeys";
import { ConfigElementType } from "configElements/ConfigElementType";

export type EntityActionTypes =
    | AddEntityAction
    | UpdateEntityAction
    | DeleteEntityAction;

export interface AddEntityAction {
    type: ActionTypeKeys.ADD_ENTITY;
    id: string,
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

export const addEntity = (id: string, entityType: ConfigElementType): AddEntityAction => ({
    type: ActionTypeKeys.ADD_ENTITY,
    id,
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