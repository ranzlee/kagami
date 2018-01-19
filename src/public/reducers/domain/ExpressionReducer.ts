import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../shared/models/enums/ConfigElementType';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { Map } from 'immutable';
import { ExpressionRecord, ExpressionParams } from './../../../shared/models/configuration/elements/Expression';

export function expressionReducer(
    expressions: Map<string, ExpressionRecord> = Map<string, ExpressionRecord>(),
    action: ConfigElementActionTypes) {

    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIG_ELEMENT_SUCCESS:
            if (action.configElementType !== ConfigElementType.expression) return expressions;
            const newElement: ExpressionParams = {
                _id: action.elementId,
                configId: action.configId,
                configElementType: action.configElementType
            };
            return expressions.set(newElement._id, new ExpressionRecord(newElement))

        case ActionTypeKeys.UPDATE_CONFIG_ELEMENT:
            return expressions.setIn([action.id, action.propertyName], action.newValue);

        case ActionTypeKeys.DELETE_CONFIG_ELEMENT:
            return expressions.delete(action.id);

        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            return expressions.mergeDeep(Map<string, ExpressionRecord>(
                action.configElements
                    .filter(item => item.configElementType === ConfigElementType.expression)
                    .map(item => [item._id, new ExpressionRecord(item)])))

        default:
            return expressions;
    }
}