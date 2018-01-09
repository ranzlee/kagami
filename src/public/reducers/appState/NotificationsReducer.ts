import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { NotificationActionTypes } from '../../actions/NotificationActions';
import { AppStateRecord } from './../../types/immutable/AppStateRecord';
import { Map } from 'immutable';
import { NotificationRecord } from './../../types/immutable/NotificationRecord';

export function notificationsReducer(
    notifications: Map<string, NotificationRecord> = Map<string, NotificationRecord>(), 
    action: NotificationActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.CREATE_NOTIFICATION:
            return notifications.set(action.notificationParams.id, new NotificationRecord(action.notificationParams)); 
            
        case ActionTypeKeys.REMOVE_NOTIFICATION:
            return notifications.delete(action.id);
        default:
            return notifications;
    }
}