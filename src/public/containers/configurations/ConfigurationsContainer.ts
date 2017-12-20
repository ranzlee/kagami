import { connect, Dispatch } from 'react-redux';
import { AppStore } from './../../types/AppStore';
import { Configurations, IOwnProps } from './../../components/configurations/Configurations';
import * as actions from './../../actions/EntityActions';
var cuid = require('cuid');

export const mapStateToProps = (AppStore: AppStore, props: IOwnProps) => {
    return {
        configurationIds: Object.keys(AppStore.domain.configurationElements);
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EntityActionTypes>) => {
    return {
        add: () => dispatch(actions.addConfig(cuid()))
    }
}

export default connect<{}, {}, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);