import { IAppState } from './../../types/AppStore';
import { EntityActionTypes } from '../../actions/EntityActions';

const defaultState: IAppState = { 
    currentConfiguration: undefined
}

export function appStateReducer(appState: IAppState = defaultState, action: EntityActionTypes) {
    switch (action.type) {
        default:
            return appState;
    }
}