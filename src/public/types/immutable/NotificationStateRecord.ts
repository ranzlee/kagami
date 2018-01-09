import { Map, Record } from 'immutable';
import { NotificationRecord } from './NotificationRecord';

export interface INotificationState {
    notifications: Map<string, NotificationRecord>;
}

export class NotificationStateRecord extends Record(Map<string, NotificationRecord>()) implements INotificationState {
    constructor(params?: INotificationState) {
        params ? super(params) : super();
    }

    notifications: Map<string, NotificationRecord>;
}