import * as React from "react";
import { Switch, Route } from 'react-router-dom';
import { FieldRouteWrapper } from "./../components/configuration/field/FieldRouteWrapper";

export default class ConfigElementRoutes extends React.Component<{}, {}> {

    render() {
        return (
            <Switch>
                <Route exact path='/configElement/field/:fieldId' component={FieldRouteWrapper} />
            </Switch>
        );
    }
}