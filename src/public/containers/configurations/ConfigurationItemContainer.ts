import { connect, Dispatch } from 'react-redux';
import { ConfigurationItem, IOwnProps, IConnectedDispatch, IConnectedState } from './../../components/configurations/ConfigurationItem';
import * as actions from './../../actions/ConfigurationActions';
import { ConfigElementType } from '../../../shared/models/enums/ConfigElementType';
import { ConfigurationRecord } from '../../../shared/models/configuration/Configuration';
import { AppStoreRecord } from './../../types/AppStore';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        configuration: appStoreRecord.domain.configurations.get(props.id) || new ConfigurationRecord()
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigurationActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) =>
            dispatch(actions.updateConfig(id, propertyName, newValue, oldValue)),

        deleteConfig: () => {
            console.log("TODO")
        }
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(ConfigurationItem);