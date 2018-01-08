import { connect, Dispatch } from 'react-redux';
import { Field, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/field/Field';
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { ConfigElementType } from "./../../../../shared/models/enums/ConfigElementType";
import * as actions from './../../../actions/ConfigElementActions';
import { AppStoreRecord } from '../../../types/AppStore';
import { ConfigElementRecord } from './../../../../shared/models/configuration/elements/IConfigElement';

export const mapStateToProps = (appStoreRecord: AppStoreRecord, props: IOwnProps): IConnectedState => {
    const test = appStoreRecord.domain.configElements.get(props.fieldId) as ConfigElementRecord;
    const cast = test as any as FieldRecord;

    return {
        field: appStoreRecord.domain.configElements.get(props.fieldId) as any as FieldRecord
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigElementActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) => dispatch(actions.updateConfigElement(id, ConfigElementType.field, propertyName, newValue, oldValue))
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Field);