import * as React from "react";
import ConfigurationItem from "./../../containers/configurations/ConfigurationItemContainer";

export interface IOwnProps { }

export interface IConnectedState {
  configurationIds: string[];
}

export interface IConnectedDispatch {
  add: () => void;
  fetchConfigs: () => void;
}

export class Configurations extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  private renderConfigs(): JSX.Element[] {
    var returnElements: JSX.Element[] = [];

    const { configurationIds } = this.props;

    for (var i = 0; i < configurationIds.length; i++) {
      returnElements.push(<ConfigurationItem id={configurationIds[i]} key={configurationIds[i]} />);
    }
    return returnElements;
  }

  componentDidMount() {
    this.props.fetchConfigs();
  }

  render() {
    const { add } = this.props;
    return (
      <div className="container-fluid">
        <h1>Configurations</h1>
        <button className="btn btn-primary" onClick={add}>
          Add Configuration
        </button>
        <hr />
        {this.renderConfigs()}
      </div>
    );
  }
}
