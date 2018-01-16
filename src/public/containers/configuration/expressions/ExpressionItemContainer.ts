import { connect, Dispatch } from 'react-redux';
import { ExpressionRecord } from "./../../../../shared/models/configuration/elements/Expression";
import { ConfigElementType } from "./../../../../shared/models/enums/ConfigElementType";
import * as actions from './../../../actions/ConfigElementActions';
import { AppStoreRecord } from '../../../types/AppStore';
import { ConfigElementRecord } from './../../../../shared/models/configuration/elements/IConfigElement';
import { ExpressionItem, IConnectedDispatch, IConnectedState, IOwnProps } from '../../../components/configuration/expressions/ExpressionItem';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    return {
        expression: ExpressionRecord.asExpressionRecord(appStoreRecord.domain.configElements.get(props.expressionId))
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {  
        delete: (fieldId: string) => {console.log("TODO")}   }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(ExpressionItem);