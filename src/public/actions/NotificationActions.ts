import { ActionTypeKeys } from "./ActionTypeKeys";
import * as Guid from 'guid';

export type NotificationActionTypes = | CreateNotificationAction | RemoveNotificationAction;

export interface RemoveNotificationAction {
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    payload: any
}
export interface CreateNotificationAction {
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    payload: any
}
export const createNotification = (notification: any): CreateNotificationAction => ({
    type: ActionTypeKeys.CREATE_NOTIFICATION, payload: { ...notification, id: Guid.raw() }
});

export const removeNotification = (notification: any): RemoveNotificationAction => (
    { type: ActionTypeKeys.REMOVE_NOTIFICATION, payload: notification }
);
