import { connect, Dispatch } from 'react-redux';
import { Expression, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/expression/Expression';
import { ExpressionRecord } from "./../../../../shared/models/configuration/elements/Expression";
import { ConfigElementType } from "./../../../../shared/models/enums/ConfigElementType";
import * as actions from './../../../actions/ConfigElementActions';
import { AppStoreRecord } from '../../../types/AppStore';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        expression: appStoreRecord.domain.expressions.get(props.expressionId) || new ExpressionRecord()
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) => {
            return dispatch(actions.updateConfigElement(id, ConfigElementType.expression, propertyName, newValue, oldValue))
        }
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Expression);