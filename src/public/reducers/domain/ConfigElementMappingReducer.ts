import { IConfigElementLookup, IConfigElementMapping } from './../../types/AppStore';
import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { IConfigurationElement } from './../../../shared/models/configuration/elements/IConfigurationElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { config } from 'rx';

export function configElementMappingReducer(configElementMapping: IConfigElementMapping = {}, action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            return createNewMappingWithAdditionalItem(
                configElementMapping,
                action.configId,
                action.configElementType,
                action.elementId);

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            return createNewMappingWithAllElements(
                configElementMapping,
                action.configElements)

        default:
            return configElementMapping;
    }
}

function createNewMappingWithAdditionalItem(
    configElementMapping: IConfigElementMapping,
    configId: string,
    configElementType: ConfigElementType,
    elementId: string): IConfigElementMapping {
    const copy = { ...configElementMapping }
    if (copy[configId] === undefined) {
        copy[configId] = {};
    }
    else {
        copy[configId] = { ...copy[configId] };
    }

    if (copy[configId][configElementType] === undefined) {
        copy[configId][configElementType] = [elementId];
    }
    else {
        copy[configId][configElementType] = copy[configId][configElementType].concat(elementId);
    }
    return copy;
}

function createNewMappingWithAllElements(
    configElementMapping: IConfigElementMapping,
    configElements: IConfigurationElement[]): IConfigElementMapping {
     return configElements.reduce(
        (mapping: IConfigElementMapping, item: IConfigurationElement, index) => {
            return createNewMappingWithAdditionalItem(mapping, item.configId, item.configElementType, item._id);
        }, configElementMapping);
}