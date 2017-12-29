import { ConfigElementType } from './../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from "./../actions/ActionTypeKeys";


export type ConfigurationElementActionTypes =
    | AddConfigElementAction
    | UpdateConfigElementAction
    | DeleteConfigElementAction;



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