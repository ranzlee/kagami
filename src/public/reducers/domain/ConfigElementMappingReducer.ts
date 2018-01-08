import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { IConfigElement } from './../../../shared/models/configuration/elements/IConfigElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { config } from 'rx';
import { domainDefaults } from '../../types/immutable/DomainRecord';
import { Map, List } from "immutable";
import { ConfigElementsByTypeRecord } from '../../types/immutable/ConfigElementsByTypeRecord';


export function configElementMappingReducer(
    configElementMapping: Map<string, ConfigElementsByTypeRecord> = domainDefaults.configElementMapping,
    action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:

            const addMergeMap = Map<string, ConfigElementsByTypeRecord>(
                [
                    action.configId,
                    new ConfigElementsByTypeRecord({ [action.configElementType]: List<string>(action.elementId) })
                ]
            );
            return configElementMapping.mergeDeep(addMergeMap)

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            const fetchMergeMap = Map<string, ConfigElementsByTypeRecord>(
                action.configElements.map(configElement => {
                    return [action.configId, new ConfigElementsByTypeRecord(configElement)]
                })
            )
            return configElementMapping.mergeDeep(fetchMergeMap)

        default:
            return configElementMapping;
    }
}