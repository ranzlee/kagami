import * as React from "react";
import { Switch, Route } from 'react-router-dom';
import Configurations from "./../containers/configurations/ConfigurationsContainer";
import Configuration from "./../containers/configuration/ConfigurationContainer";

export default class ConfigurationRoutes extends React.Component<{}, {}> {

    render() {
        return (
            <Switch>
                <Route exact path='/configuration' component={Configurations} />
                <Route exact path='/configuration/:configId' component={Configuration} />
                <Route exact path='/configuration/:configId/Field' component={Fields}/>
                <Route exact path='/configuration/:configId/Field/:fieldId' component={Field}/>
            </Switch>
        );
    }
}