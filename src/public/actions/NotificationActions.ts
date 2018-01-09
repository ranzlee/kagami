import { ActionTypeKeys } from "./ActionTypeKeys";
import { NotificationRecord, INotification, INotificationParams } from "./../types/immutable/NotificationRecord";

export type NotificationActionTypes = | CreateNotificationAction | RemoveNotificationAction;

export interface RemoveNotificationAction {
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    id: string
}
export interface CreateNotificationAction {
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    notificationParams: INotificationParams
}
export const createNotification = (notificationParams: INotificationParams): CreateNotificationAction => ({
    type: ActionTypeKeys.CREATE_NOTIFICATION,
    notificationParams
});

export const removeNotification = (id: string): RemoveNotificationAction => ({
    type: ActionTypeKeys.REMOVE_NOTIFICATION,
    id
});
