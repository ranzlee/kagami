import * as React from "react";
import { connect } from 'react-redux';
//declare module 'react-bs-notifier';
import { AlertList } from 'react-bs-notifier';
import { removeNotification } from '../actions/NotificationActions';
import { List } from "immutable";
import { NotificationRecord, INotification } from "../types/immutable/NotificationRecord";

export interface IOwnProps {

}
export interface IConnectedState {
    notifications: NotificationRecord[];
}

export interface IConnectedDispatch {
    removeNotification: (notification: INotification) => void;
}

export class NotificationsList extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
    render() {
        return (
            <div>
                <AlertList
                    position="top-right"
                    alerts={this.props.notifications}
                    onDismiss={(notification: any) => this.props.removeNotification(notification)}
                />
            </div>
        )
    }
}