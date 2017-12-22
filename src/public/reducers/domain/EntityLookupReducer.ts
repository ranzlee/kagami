import { EntityActionTypes } from './../../actions/EntityActions';
import { ActionTypeKeys } from './../../actions/ActionTypeKeys';

export function entityLookupReducer(lookup: any = {}, action: EntityActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.ADD_CONFIGURATION:
            return { ...lookup, [action.configId]: { id: action.configId } };
        case ActionTypeKeys.ADD_ENTITY:
            return { ...lookup, [action.entityId]: { id: action.entityId } };
        case ActionTypeKeys.UPDATE_ENTITY:
            var copy = { ...lookup };
            var entity = copy[action.id];
            entity[action.propertyName] = action.newValue;
            return copy;
        case ActionTypeKeys.DELETE_ENTITY:
            var copy = { ...lookup }
            delete copy[action.id];
            return copy;
        default:
            return lookup;
    }
}