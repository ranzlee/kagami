import { IAppState } from './../../types/AppStore';
import { GeneralActionTypes } from '../../actions/GeneralActions';

const defaultState: IAppState = { 
    currentConfiguration: undefined
}

export function appStateReducer(appState: IAppState = defaultState, action: GeneralActionTypes) {
    switch (action.type) {
        default:
            return appState;
    }
}