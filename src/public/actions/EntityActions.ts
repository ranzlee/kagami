import { ActionTypeKeys } from "actions/ActionTypeKeys";
import { Action, ActionCreator, Dispatch } from 'redux';
import { App } from "types/App";
import { ThunkAction } from 'redux-thunk';
import * as playerApi from "apis/PlayerApi"
import { IPlayer } from "shared/models/Player"

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
    type: ActionTypeKeys.SAVE_ADD_PLAYER;
    id: string;
    firstName: string;
    lastName: string;
}
export interface DeleteEntityAction {
    type: ActionTypeKeys.DELETE_ENTITY ;
}


export const startAddPlayer = (): StartAddPlayerItemAction => ({
    type: ActionTypeKeys.START_ADD_PLAYER,
});
export const saveAddPlayer = (id: string, firstName: string, lastName: string): SaveAddPlayerItemAction => ({
    type: ActionTypeKeys.SAVE_ADD_PLAYER,
    id,
    firstName,
    lastName
});
export const cancelAddPlayer = (): CancelAddPlayerItemAction => ({
    type: ActionTypeKeys.CANCEL_ADD_PLAYER,
});
export const deletePlayer = (id: string): DeletePlayerItemAction => ({
    type: ActionTypeKeys.DELETE_PLAYER,
    id
});
export const updatePlayer = (id: string, firstName: string, lastName: string): UpdatePlayerAction => ({
    type: ActionTypeKeys.UPDATE_PLAYER,
    id,
    firstName,
    lastName
});
export const setEditPlayer = (id: string): SetEditPlayerAction => ({
    type: ActionTypeKeys.SET_EDIT_PLAYER,
    id
});

export const fetchAllPlayers = () => {
    return (dispatch: any) => {
        playerApi.fetchAllPlayers
            .then((response: any) => dispatch({
                type: ActionTypeKeys.FETCH_ALL_PLAYERS_SUCCESS,
                players: response.data
            }).error((response: any) => dispatch({
                type: ActionTypeKeys.FETCH_ALL_PLAYERS_FAIL,
                error: response.error
            })));
      }
};