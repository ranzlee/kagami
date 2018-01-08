import { ConfigElementActionTypes } from './../../actions/ConfigElementActions';
import { INotificationState } from './../../types/AppStore';
import { ActionTypeKeys } from '../../actions/ActionTypeKeys';
import { reject } from "lodash";
import { NotificationActionTypes } from '../../actions/NotificationActions';
import { Notification } from './../../../shared/models/Notification';

const defaultState: INotificationState = {
    notifications: new Array<Notification>()
};

export function notificationStateReducer(notificationState: INotificationState = defaultState, action: NotificationActionTypes) {
    switch (action.type) {
        case ActionTypeKeys.CREATE_NOTIFICATION:
            if (!action || !action.payload)
                return notificationState;

            return { ...notificationState, notifications: [...notificationState.notifications, action.payload] }
        case ActionTypeKeys.REMOVE_NOTIFICATION:
            if (!action || !action.payload)
                return notificationState;

            return { ...notificationState, notifications: notificationState.notifications.filter(n => n.id == action.payload.id) }
        default:
            return notificationState;
    }
}