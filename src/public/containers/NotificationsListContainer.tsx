import { connect, Dispatch } from 'react-redux'
import { AlertList } from 'react-bs-notifier'
import { removeNotification, NotificationActionTypes } from '../actions/NotificationActions';
import { AppStoreRecord } from '../types/AppStore';
import { NotificationsList, IOwnProps, IConnectedState, IConnectedDispatch } from '../components/NotificationsList';
import { INotification } from './../types/immutable/NotificationRecord';

const mapStateToProps = (appStoreRecord: AppStoreRecord, ownProps: IOwnProps): IConnectedState => {
    return {
        notifications: appStoreRecord.appState.notificationState.notifications.toIndexedSeq().toArray()
    }
}

const mapDispatchToProps = (dispatch: Dispatch<NotificationActionTypes>, ownProps: IOwnProps): IConnectedDispatch => ({
    removeNotification: (notification: INotification) => dispatch(removeNotification(notification.id))
})



export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(NotificationsList);