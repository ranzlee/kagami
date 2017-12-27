import * as React from "react";
import { Button } from "react-bootstrap";
import {Configuration as Config} from "./../../../shared/models/configuration/Configuration"

export interface IOwnProps {
    configId: string;
}

export interface IConnectedState {
    configuration: Config;
}

export interface IConnectedDispatch {
}

export class Configuration extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

    render() {
        const { configuration } = this.props;
        return (
            <div>Configuration: {configuration.name}</div>
        );
    }
}