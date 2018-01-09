import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { IConfigElement } from './../../../shared/models/configuration/elements/IConfigElement';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { config } from 'rx';
import { Map, Set } from "immutable";
import { ConfigElementsByTypeRecord } from '../../types/immutable/ConfigElementsByTypeRecord';


export function configElementMappingReducer(
    configElementMapping: Map<string, ConfigElementsByTypeRecord> = Map<string, ConfigElementsByTypeRecord>(),
    action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            const addMergeMap = Map<string, ConfigElementsByTypeRecord>(
                [[action.configId, new ConfigElementsByTypeRecord({ [action.configElementType]: Set<string>([action.elementId]) })]]
            );
            return configElementMapping.mergeDeep(addMergeMap)

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:


            const configElementByTypeRecord = new ConfigElementsByTypeRecord(
                {
                    field: Set<string>(action.configElements.filter(i => i.configElementType === ConfigElementType.field).map(i => i._id)),
                    expression: Set<string>(action.configElements.filter(i => i.configElementType === ConfigElementType.expression).map(i => i._id))
                });

            const fetchMergeMap = Map<string, ConfigElementsByTypeRecord>(
                [
                    [action.configId, configElementByTypeRecord]
                ]);


            return configElementMapping.mergeDeep(fetchMergeMap)

        default:
            return configElementMapping;
    }
}