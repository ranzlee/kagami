import * as React from "react";
import Config from "./../../../containers/configuration/fields/FieldsContainer";

export interface IOwnProps { }

export interface IConnectedState {
  fieldIds: string[];
}

export interface IConnectedDispatch {
  add: () => void;
  fetchConfigs: () => void;
}

export class Fields extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  private renderFields(): JSX.Element[] {
    var returnElements: JSX.Element[] = [];

    const { fieldIds } = this.props;

    for (var i = 0; i < fieldIds.length; i++) {
      returnElements.push(<Field id={fieldIds[i]} key={fieldIds[i]} />);
    }
    return returnElements;
  }

  render() {
    const { add } = this.props;
    return (
      <div className="container-fluid">
        <h1>Fields</h1>
        <button className="btn btn-primary" onClick={add}>
          Add Field
        </button>
        <hr />
        {this.renderFields()}
      </div>
    );
  }
}
