import * as React from "react";
import { Button } from "react-bootstrap";
import { Configuration as Config } from "./../../../shared/models/configuration/Configuration"

export interface IOwnProps {
    match: any; // route match
}

export interface IConnectedState {
    configuration: Config;
}

export interface IConnectedDispatch {
    fetchConfig: (id: string) => void;
}

export class Configuration extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
    componentDidMount() {
        const { configuration, match, fetchConfig } = this.props;
        if (!configuration) {
            fetchConfig(match.params.configId);
        }
    }

    render() {
        const { configuration } = this.props;
        return (
            <div>Configuration: {configuration.name}</div>
        );
    }
}