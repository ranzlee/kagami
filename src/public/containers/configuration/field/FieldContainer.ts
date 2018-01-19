import { connect, Dispatch } from 'react-redux';
import { Field, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/field/Field';
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { ConfigElementType } from "./../../../../shared/models/enums/ConfigElementType";
import * as actions from './../../../actions/ConfigElementActions';
import { AppStoreRecord } from '../../../types/AppStore';
import { ExpressionRecord } from '../../../../shared/models/configuration/elements/Expression';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    const field = appStoreRecord.domain.fields.get(props.fieldId) || new FieldRecord();
    const expressionIds = appStoreRecord.domain.configMappings.get(field.configId).expressions.toIndexedSeq().toArray();
    const expressions = expressionIds.map(i => appStoreRecord.domain.expressions.get(i));

    return {
        field,
        expressions
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) => {
            return dispatch(actions.updateConfigElement(id, ConfigElementType.field, propertyName, newValue, oldValue));
        },
        addFieldAddress: (elementId: string) => {
            return dispatch(actions.addFieldAddress(elementId));
        },
        updateFieldAddress: (fieldId: string,
            addressIndex: number,
            propertyName: string,
            newValue: any,
            oldValue: any) => {
            return dispatch(actions.updateFieldAddress(fieldId, addressIndex, propertyName, newValue, oldValue))
        }
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Field);