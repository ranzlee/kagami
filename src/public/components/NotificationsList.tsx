import * as React from "react";
import { connect } from 'react-redux';
//declare module 'react-bs-notifier';
import { AlertList } from 'react-bs-notifier';
import { removeNotification } from '../actions/NotificationActions';

export interface IOwnProps {

}
export interface IConnectedState {
    notifications: Array<any>;
}

export interface IConnectedDispatch {
    removeNotification: (notification: any) => void;
}

export class NotificationsList extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
    render() {
        return (
            <div>
                <AlertList
                    position="top-right"
                    alerts={this.props.notifications}
                    timeout={4000}
                    onDismiss={(notification: any) => this.props.removeNotification(notification)}
                />
            </div>
        )
    }
}