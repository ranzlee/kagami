import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { Map, Set } from 'immutable';
import { ExpressionRecord, ExpressionParams } from './../../../shared/models/configuration/elements/Expression';
import { ConfigElementMappingRecord, ConfigElementMappingParams, IConfigElementMappingRecord } from '../../types/immutable/ConfigElementMappingRecord';

export function configMappingsReducer(
    configMappings: Map<string, ConfigElementMappingRecord> = Map<string, ConfigElementMappingRecord>(),
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            let defaultMergeParams: ConfigElementMappingParams = {};
            switch (action.configElementType) {
                case ConfigElementType.field:
                    defaultMergeParams.fields = Set<string>(action.elementId);
                    break;
                case ConfigElementType.expression:
                    defaultMergeParams.expressions = Set<string>(action.elementId);
                    break;
            }
            const configElementMappingRecord = new ConfigElementMappingRecord(defaultMergeParams);
            return configMappings.mergeDeep(Map<string, ConfigElementMappingRecord>([[action.configId, configElementMappingRecord]]));

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            return configMappings.delete(action.id);

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            alert("TODO");
            return configMappings;

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            const fields: string[] = [];
            const expressions: string[] = [];

            action.configElements.forEach(configElement => {
                switch (configElement.configElementType) {
                    case ConfigElementType.field:
                        fields.push(configElement._id);
                        break;
                    case ConfigElementType.expression:
                        expressions.push(configElement._id);
                        break;
                }
            });

            const defaultParams: ConfigElementMappingParams = {
                fields: Set<string>(fields),
                expressions: Set<string>(expressions)
            }
            const newMergeRecord = new ConfigElementMappingRecord(defaultParams);
            return configMappings.mergeDeep(Map<string, ConfigElementMappingRecord>([[action.configId, newMergeRecord]]));

        default:
            return configMappings;
    }
}