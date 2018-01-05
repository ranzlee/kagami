import * as React from "react";
import { Configuration as Config } from "./../../../shared/models/configuration/Configuration";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

interface IRouteParams {
  configId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  configuration: Config;
  areConfigElementsLoaded: boolean;
}

export interface IConnectedDispatch {
  fetchConfigElements: (id: string) => void;
}

export class Configuration extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {
  componentDidMount() {
    const { areConfigElementsLoaded, fetchConfigElements } = this.props;
    if (!areConfigElementsLoaded) {
      fetchConfigElements(this.props.match.params.configId);
    }
  }

  render() {
    const { configuration } = this.props;
    const editFieldUrl = `/configuration/${configuration._id}/field`;

    return (
      <div>
        <h2>
          Configuration: {configuration.name}
        </h2>
        <Link to={editFieldUrl}>
          <button type="button" className="btn btn-primary">
            Manage Fields
            </button>
        </Link>
      </div>
    );
  }
}