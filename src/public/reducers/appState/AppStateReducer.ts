import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { IAppState } from './../../types/AppStore';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { reject } from "lodash";

const defaultState: IAppState = {
    currentConfiguration: undefined,
    fetchedConfigs: [],
    notificationState: {} as any
};

export function appStateReducer(appState: IAppState = defaultState, action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            if (!action.configElements || action.configElements.length === 0) return appState;
            const configId = action.configElements[0].configId;

            return { ...appState, fetchedConfigs: [...appState.fetchedConfigs, configId] };

        default:
            return appState;
    }
}