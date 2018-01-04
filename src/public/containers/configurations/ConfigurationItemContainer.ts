import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { ConfigurationItem, IOwnProps, IConnectedDispatch, IConnectedState } from './../../components/configurations/ConfigurationItem';
import * as actions from './../../actions/ConfigurationActions';
import { ConfigElementType } from '../../../shared/models/enums/ConfigElementType';

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps): IConnectedState => {
    return {
        configuration: AppStore.domain.configurations[props.id] || {} as any
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ConfigurationActionTypes>): IConnectedDispatch => {
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

export default connect<IConnectedState, IConnectedDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps)(ConfigurationItem);