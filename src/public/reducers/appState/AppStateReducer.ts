import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { IAppState } from './../../types/AppStore';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';

const defaultState: IAppState = {
    currentConfiguration: undefined,
    fetchedConfigs: []
}

export function appStateReducer(appState: IAppState = defaultState, action: ConfigElementActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.FETCH_CONFIG_ELEMENTS_SUCCESS:
            if (!action.configElements || action.configElements.length === 0) return appState;
            const configId = action.configElements[0].configId;
            const copy = { ... appState }
            copy.fetchedConfigs = copy.fetchedConfigs.concat(configId);
            return copy;
        default:
            return appState;
    }
}