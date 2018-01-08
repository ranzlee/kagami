import { connect, Dispatch } from 'react-redux'
import { AlertList } from 'react-bs-notifier'
import { removeNotification, NotificationActionTypes } from '../actions/NotificationActions';
import { AppStore } from '../types/AppStore';
import { NotificationsList, IOwnProps, IConnectedState, IConnectedDispatch } from '../components/NotificationsList';

const mapDispatchToProps = (dispatch: Dispatch<NotificationActionTypes>, ownProps: IOwnProps) => ({
    removeNotification: (notification: any) => dispatch(removeNotification(notification))
})

const mapStateToProps = (state: AppStore, ownProps: IOwnProps) => ({
    notifications: state.appState.notificationState.notifications
})

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(NotificationsList);