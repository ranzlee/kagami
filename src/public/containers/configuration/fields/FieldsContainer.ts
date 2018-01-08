import { connect, Dispatch } from 'react-redux';
import { Fields, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/fields/Fields';
import * as actions from './../../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../../shared/models/enums/ConfigElementType';
import { AppStoreRecord } from '../../../types/AppStore';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        fieldIds: appStoreRecord.domain.configElementMapping.get(props.match.params.configId).fields
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        add: (configId: string) => dispatch(actions.addConfigElement(configId, ConfigElementType.field)),
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Fields);