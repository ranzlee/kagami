import * as React from "react";
import Config from "./../../containers/configurations/ConfigContainer";

export interface IOwnProps {}

export interface IConnectedState {
  configurationIds: string[];
}

export interface IConnectedDispatch {
  add: () => void;
}

export class Configurations extends React.Component<
  IOwnProps & IConnectedState & IConnectedDispatch,
  {}
> {
  private renderConfigs(): JSX.Element[] {
    var returnElements: JSX.Element[] = [];

    const { configurationIds } = this.props;

    for (var i = 0; i < configurationIds.length; i++) {
      returnElements.push(<Config id={configurationIds[i]} />);
    }
    return returnElements;
  }

  render() {
    const { add } = this.props;
    return (
      <div>
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
