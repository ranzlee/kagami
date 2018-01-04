import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configuration, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configuration/Configuration';
import * as actions from './../../actions/ConfigElementActions';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configuration: AppStore.domain.configurations[props.match.params.configId],
        areConfigElementsLoaded: AppStore.domain.configElementMapping[props.match.params.configId] !== undefined
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        fetchConfigElements: (id: string) => dispatch(actions.fetchConfigElements(id))
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configuration);