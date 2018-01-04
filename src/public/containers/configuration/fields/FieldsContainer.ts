import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../.././../types/AppStore';
import { Fields, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/fields/Fields';
import * as actions from './../../../actions/ConfigElementActions';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        fieldIds: AppStore.domain.configElements.filter((configElement: IConfigElement) => configElement.ty)
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        add: () => dispatch(actions.addConfigElement()),
        fetchConfigs: () => dispatch(actions.fetchConfigs())
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Fields);