import { Record } from 'immutable';
import { NotificationStateRecord } from "./NotificationStateRecord";
import { GenericPartial } from '../../../shared/models/Helpers';

interface IAppStateRecord {
    currentConfiguration?: string;
    notificationState: NotificationStateRecord;
}

export type AppStateParams = GenericPartial<IAppStateRecord>;

export const appStateDefaults = {
    currentConfiguration: "",
    notificationState: new NotificationStateRecord()
}

export class AppStateRecord extends Record(appStateDefaults) implements IAppStateRecord {
    constructor(params?: AppStateParams) {
        params ? super(params) : super();
    }

    currentConfiguration?: string;
    notificationState: NotificationStateRecord;
}