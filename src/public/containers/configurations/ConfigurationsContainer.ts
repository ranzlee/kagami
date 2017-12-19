import { AppStore } from './../../types/AppStore';
import { Configurations, IOwnProps } from 'components/configurations/Configurations';





export const mapStateToProps = (AppStore: AppStore, props: IOwnProps) => {
    return {
        configurationIds: Object.keys(AppStore.domain.configurationElements);
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.PlayerActionTypes>) => {
    return {
        add()
    }
}

export default connect<{}, {}, IOwnProps>(mapStateToProps, mapDispatchToProps)(Configurations);

