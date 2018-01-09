import { Record } from 'immutable';
import { NotificationStateRecord } from "./NotificationStateRecord";

export interface IAppStateRecord {
    currentConfiguration?: string;
    notificationState: NotificationStateRecord;
}

export const appStateDefaults = {
    currentConfiguration: "",
    notificationState: new NotificationStateRecord()
}

export class AppStateRecord extends Record(appStateDefaults) implements IAppStateRecord {
    constructor(params?: IAppStateRecord) {
        params ? super(params) : super();
    }

    currentConfiguration?: string;
    notificationState: NotificationStateRecord;
}