import { Record } from 'immutable';
import { GenericPartial } from './../../../shared/models/Helpers';

export interface INotification {
    message: string;
    id: string;
    headline: string;
    showIcon: boolean;
    timeoutInMs: number; 
    type: string;
}

export type NotificationParams = GenericPartial<INotification>

const notificationDefaults : INotification = {
    message: "",
    id: "",
    headline:"",
    showIcon: false,
    type: "success",
    timeoutInMs: 5000 
}

export class NotificationRecord extends Record(notificationDefaults) implements INotification {
    constructor(params?: NotificationParams) {
        params ? super(params) : super();
    }

    message: string;
    id: string;
    headline: string;
    showIcon: boolean;
    timeoutInMs: number;
    type: string;
}