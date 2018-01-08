import { connect, Dispatch } from 'react-redux'
import { AlertList } from 'react-bs-notifier'
import { removeNotification, NotificationActionTypes } from '../actions/NotificationActions';
import { AppStoreRecord } from '../types/AppStore';
import { NotificationsList, IOwnProps, IConnectedState, IConnectedDispatch } from '../components/NotificationsList';

const mapDispatchToProps = (dispatch: Dispatch<NotificationActionTypes>, ownProps: IOwnProps) => ({
    removeNotification: (notification: any) => dispatch(removeNotification(notification))
})

const mapStateToProps = (appStoreRecord: AppStoreRecord, ownProps: IOwnProps) => ({
    notifications: appStoreRecord.appState.notificationState.notifications
})

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(NotificationsList);