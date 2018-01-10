import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { reject } from "lodash";
import { AppStateRecord } from '../../types/immutable/AppStateRecord';

export function appStateReducer(appStateRecord: AppStateRecord = new AppStateRecord(), action: ConfigElementActionTypes) {
    switch (action.type) {
        default:
            return appStateRecord;
    }
}