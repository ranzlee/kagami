import * as React from "react";
import { Button } from "react-bootstrap";
import { IConfiguration } from "./../../../shared/models/configuration/elements/IConfiguration";

export interface IOwnProps {
    configId: string;
}

export interface IConnectedState {
    configuration: IConfiguration;
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