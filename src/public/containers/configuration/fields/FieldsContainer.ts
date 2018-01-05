import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../.././../types/AppStore';
import { Fields, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/fields/Fields';
import * as actions from './../../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../../shared/models/enums/ConfigElementType';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        fieldIds: AppStore.domain.configElementMapping[props.match.params.configId][ConfigElementType.field]
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        add: (configId: string) => dispatch(actions.addConfigElement(configId, ConfigElementType.field)),
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Fields);