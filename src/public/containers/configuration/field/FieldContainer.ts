import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../../types/AppStore';
import { Field, IOwnProps, IConnectedState, IConnectedDispatch } from './../../../components/configuration/field/Field';
import {Field as FieldModel} from "./../../../../shared/models/configuration/elements/Field";
import {ConfigElementType} from "./../../../../shared/models/enums/ConfigElementType";
import * as actions from './../../../actions/ConfigElementActions';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        field: AppStore.domain.configElements[props.fieldId] as FieldModel
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