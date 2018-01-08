import * as React from "react";
import { Switch, Route } from 'react-router-dom';
import Configurations from "./../containers/configurations/ConfigurationsContainer";
import Configuration from "./../containers/configuration/ConfigurationContainer";
import Fields  from "./../containers/configuration/fields/FieldsContainer";
import { FieldRouteWrapper } from "./../components/configuration/field/FieldRouteWrapper";

export default class ConfigurationRoutes extends React.Component<{}, {}> {

    render() {
        return (
            <Switch>
                <Route exact path='/configuration' component={Configurations} />
                <Route exact path='/configuration/:configId' component={Configuration} />
                <Route exact path='/configuration/:configId/field' component={Fields}/>
                <Route exact path='/configuration/:configId/field/:fieldId' component={FieldRouteWrapper}/>
            </Switch>
        );
    }
}