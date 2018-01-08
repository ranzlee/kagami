import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { IAppState } from './../../types/AppStore';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { reject } from "lodash";

const defaultState: IAppState = {
    currentConfiguration: undefined,
    notificationState: {} as any
};

export function appStateReducer(appState: IAppState = defaultState, action: ConfigElementActionTypes) {
    switch (action.type) {
        default:
            return appState;
    }
}