import { connect, Dispatch } from 'react-redux';
import { Configurations, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configurations/Configurations';
import * as actions from './../../actions/ConfigurationActions';
import * as notificationActions from './../../actions/NotificationActions';
import { Notification } from './../../../shared/models/Notification';
import { AppStoreRecord } from './../../types/AppStore';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        configurationIds: appStoreRecord.domain.configurations.keySeq().toArray()
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigurationActionTypes>): IConnectedDispatch => {
    return {
        add: () => {
            dispatch(actions.addConfig());
            let notf = Notification.createSuccess("Configuration Added!!!");
            dispatch(notificationActions.createNotification(notf))
        },
        fetchConfigs: () => dispatch(actions.fetchConfigs())
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);