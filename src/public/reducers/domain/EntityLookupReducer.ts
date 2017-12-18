import { PlayerActionTypes } from "actions/PlayerActions";
import { ActionTypeKeys } from "actions/ActionTypeKeys";

export function entityLookupReducer(lookup: any = {}, action: PlayerActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.SAVE_ADD_PLAYER:
            return { ...lookup, [action.id]: { id: action.id, firstName: action.firstName, lastName: action.lastName } };
        case ActionTypeKeys.UPDATE_PLAYER:
            return { ...lookup, [action.id]: { id: action.id, firstName: action.firstName, lastName: action.lastName } };
        case ActionTypeKeys.FETCH_ALL_PLAYERS_SUCCESS:
            var copy = { ...lookup };
            if (action.players) {
                for (let i = 0; i < action.players.length; i++) {
                    let player = action.players[i];
                    copy[player.id] = player;
                }
            }
            return copy;
        case ActionTypeKeys.DELETE_PLAYER:
            var copy = { ...lookup }
            delete copy[action.id];
            return copy;
        default:
            return lookup;
    }
}