import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Config, IOwnProps, IConnectedDispatch, IConnectedState } from './../../components/configurations/Config';
import * as actions from './../../actions/EntityActions';
import { ConfigElementType } from '../../../shared/models/enums/ConfigElementType';

var cuid = require('cuid');

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configuration: AppStore.domain.configurations[props.id]
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EntityActionTypes>): IConnectedDispatch => {
    return {
        update: (id: string,
            propertyName: string,
            newValue: any,
            oldValue: any) =>
            dispatch(actions.updateConfig(id, propertyName, newValue, oldValue)),

        deleteConfig: () => {
            console.log("TODO")
        }
    }
}

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(Config);