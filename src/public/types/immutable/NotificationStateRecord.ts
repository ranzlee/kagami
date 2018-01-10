import { Map, Record } from 'immutable';
import { NotificationRecord } from './NotificationRecord';
import { GenericPartial } from '../../../shared/models/Helpers';

export interface INotificationState {
    notifications: Map<string, NotificationRecord>;
}

export type NotificationStateParams = GenericPartial<INotificationState>;

const defaultNotificationState: INotificationState = {
    notifications: Map<string, NotificationRecord>()
}

export class NotificationStateRecord extends Record(defaultNotificationState) implements INotificationState {
    constructor(params?: NotificationStateParams) {
        params ? super(params) : super();
    }

    notifications: Map<string, NotificationRecord>;
}