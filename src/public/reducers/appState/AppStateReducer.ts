import { EntityActionTypes } from "actions/EntityActions";
import { IAppState } from "types/AppStore";

const defaultState: IAppState = { }

export function appStateReducer(appState: IAppState = defaultState, action: EntityActionTypes) {
    switch (action.type) {
        default:
            return appState;
    }
}