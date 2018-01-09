import { connect, Dispatch } from 'react-redux';
import { AppStoreRecord } from './../../types/AppStore';
import { Configuration, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configuration/Configuration';
import * as configElementActions from './../../actions/ConfigElementActions';
import * as configActions from './../../actions/ConfigurationActions';
import { ConfigurationRecord } from "./../../../shared/models/configuration/Configuration"

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        configuration: appStoreRecord.domain.configurations.get(props.match.params.configId) || new ConfigurationRecord(),
        areConfigElementsLoaded: appStoreRecord.domain.configElementMapping.has(props.match.params.configId)
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<configElementActions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) =>
            dispatch(configActions.updateConfig(id, propertyName, newValue, oldValue)),
        fetchConfigElements: (id: string) => dispatch(configElementActions.fetchConfigElements(id))
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configuration);