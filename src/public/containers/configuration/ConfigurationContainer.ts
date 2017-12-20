import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configuration, IOwnProps, IConnectedState, IConnectedDispatch } from './../../components/configuration/Configuration';
import * as actions from './../../actions/EntityActions';
import { ConfigElementType } from '../../../shared/models/configuration/elements/ConfigElementType';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps) : IConnectedState => {
    return {
        configuration: AppStore.domain.entityLookup[props.configId]
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EntityActionTypes>): IConnectedDispatch  => {
    return { }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configuration);