import { Record } from 'immutable';

export interface INotification {
    message: string;
    id: string;
    headline: string;
    showIcon: boolean;
    timeoutInMs: number; 
    type: string;
}

export interface INotificationParams {
    id?: string;
    message?: string;
    headline?: string;
    showIcon?: boolean;
    timeoutInMs?: number; 
    type?: string;
}

const notificationDefaults : INotification = {
    message: "",
    id: "",
    headline:"",
    showIcon: false,
    type: "success",
    timeoutInMs: 5000 
}

export function getNotificationDefaults() : INotification {
    return {...notificationDefaults}; // Make copy to be sure nobody changes default values
}

export class NotificationRecord extends Record(notificationDefaults) implements INotification {
    constructor(params?: INotificationParams) {
        params ? super(params) : super();
    }

    message: string;
    id: string;
    headline: string;
    showIcon: boolean;
    timeoutInMs: number;
    type: string;
}