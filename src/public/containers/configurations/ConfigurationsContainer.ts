import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configurations, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configurations/Configurations';
import * as actions from './../../actions/ConfigurationActions';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configurationIds: AppStore.domain.configurations.keySeq().toArray()
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigurationActionTypes>): IConnectedDispatch => {
    return {
        add: () => dispatch(actions.addConfig()),
        fetchConfigs: () => dispatch(actions.fetchConfigs())
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);