import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { IAppState } from './../../types/AppStore';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

const defaultState: IAppState = {
    currentConfiguration: undefined,
}

export function appStateReducer(appState: IAppState = defaultState, action: ConfigElementActionTypes) {
    switch (action.type) {
        default:
            return appState;
    }
}