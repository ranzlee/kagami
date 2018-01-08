import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configuration, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configuration/Configuration';
import * as configElementActions from './../../actions/ConfigElementActions';
import * as configActions from './../../actions/ConfigurationActions';
import { ConfigurationRecord } from "./../../../shared/models/configuration/Configuration"

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configuration: AppStore.domain.configurations.get(props.match.params.configId) || new ConfigurationRecord(),
        areConfigElementsLoaded: AppStore.domain.configElementMapping[props.match.params.configId] !== undefined
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