import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configurations, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configurations/Configurations';
import * as actions from './../../actions/EntityActions';
var cuid = require('cuid');

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configurationIds: Object.keys(AppStore.domain.configElements)
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EntityActionTypes>): IConnectedDispatch => {
    return {
        add: () => dispatch(actions.addConfig(cuid()))
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);