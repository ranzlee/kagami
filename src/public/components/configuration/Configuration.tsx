import * as React from "react";
import { Configuration as Config } from "./../../../shared/models/configuration/Configuration";
import { RouteComponentProps } from "react-router";

interface IRouteParams {
  configId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  configuration: Config;
}

export interface IConnectedDispatch {
  fetchConfig: (id: string) => void;
}

export class Configuration extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
  componentDidMount() {
    const { configuration, fetchConfig } = this.props;
    if (!configuration) {
      fetchConfig(this.props.match.params.configId);
    }
  }

  render() {
    const { configuration } = this.props;
    return <div>Configuration: {configuration.name}</div>;
  }
}