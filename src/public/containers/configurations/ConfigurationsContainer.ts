import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configurations, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configurations/Configurations';
import * as actions from './../../actions/ConfigurationActions';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configurationIds: Object.keys(AppStore.domain.configurations)
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigurationActionTypes>): IConnectedDispatch => {
    return {
        add: () => dispatch(actions.addConfig())
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);