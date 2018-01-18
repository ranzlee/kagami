import { connect, Dispatch } from 'react-redux';
import { Expressions, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/expressions/expressions';
import * as actions from './../../../actions/ConfigElementActions';
import { ConfigElementType } from './../../../../shared/models/enums/ConfigElementType';
import { AppStoreRecord } from '../../../types/AppStore';
import { Set } from 'immutable';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        expressionIds: appStoreRecord.domain.configMappings.get(props.match.params.configId).expressions || Set<string>()
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        add: (configId: string) => dispatch(actions.addConfigElement(configId, ConfigElementType.expression)),
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Expressions);