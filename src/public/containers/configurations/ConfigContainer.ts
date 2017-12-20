import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Config, IOwnProps } from './../../components/configurations/Config';
import * as actions from './../../actions/EntityActions';
import { ConfigElementType } from '../../../shared/models/configuration/elements/ConfigElementType';
var cuid = require('cuid');

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps) => {
    return {
        configuration: AppStore.domain.entityLookup[props.id]
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EntityActionTypes>) => {
    return {
        update: (id: string,
            entityType: ConfigElementType,
            propertyName: string,
            newValue: any,
            oldValue: any) =>
            dispatch(actions.updateEntity(id, entityType, propertyName, newValue, oldValue))
    }
}

export default connect<{}, {}, IOwnProps>(mapStateToProps, mapDispatchToProps)(Config);