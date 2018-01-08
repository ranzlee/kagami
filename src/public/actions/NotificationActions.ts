import { ActionTypeKeys } from "./ActionTypeKeys";
import { Notification } from "./../../shared/models/Notification";

export type NotificationActionTypes = | CreateNotificationAction | RemoveNotificationAction;

export interface RemoveNotificationAction {
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    notification: Notification
}
export interface CreateNotificationAction {
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    notification: Notification
}
export const createNotification = (notification: Notification): CreateNotificationAction => ({
    type: ActionTypeKeys.CREATE_NOTIFICATION, notification: { ...notification }
});

export const removeNotification = (notification: Notification): RemoveNotificationAction => (
    { type: ActionTypeKeys.REMOVE_NOTIFICATION, notification: notification }
);
