import * as React from "react";
import { Switch, Route } from 'react-router-dom';
import Configurations from "containers/configuration/ConfigurationsContainer";
import EditConfiguration from "containers/configuration/EditConfigurationContainer";

export default class PlayerRoutes extends React.Component<{}, { }> {

    render() {
        return (
            <Switch>
                <Route exact path='/configuration' component={Configurations} />
                <Route path='/configuration/:id' component={EditConfiguration} />
            </Switch>
        );
    }
}