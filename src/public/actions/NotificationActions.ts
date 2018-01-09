import { ActionTypeKeys } from "./ActionTypeKeys";
import { NotificationRecord, INotification, NotificationParams } from "./../types/immutable/NotificationRecord";

export type NotificationActionTypes = | CreateNotificationAction | RemoveNotificationAction;

export interface RemoveNotificationAction {
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    id: string
}
export interface CreateNotificationAction {
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    notificationParams: NotificationParams
}
export const createNotification = (notificationParams: NotificationParams): CreateNotificationAction => ({
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    notificationParams
});

export const removeNotification = (id: string): RemoveNotificationAction => ({
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    id
});
