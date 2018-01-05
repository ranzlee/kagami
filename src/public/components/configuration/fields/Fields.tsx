import * as React from "react";
import Config from "./../../../containers/configuration/fields/FieldsContainer";
import Field from "./../../../containers/configuration/field/FieldContainer"
import { RouteComponentProps } from "react-router";

interface IRouteParams {
  configId: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  fieldIds: string[];
}

export interface IConnectedDispatch {
  add: (configId: string) => void;
}

export class Fields extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  private renderFields(): JSX.Element[] {
    var returnElements: JSX.Element[] = [];

    const { fieldIds } = this.props;

    if (fieldIds) {
      for (var i = 0; i < fieldIds.length; i++) {
        returnElements.push(<Field fieldId={fieldIds[i]} key={fieldIds[i]} />);
      }
    }
    return returnElements;
  }

  private add(): void {
    const { add } = this.props;
    add(this.props.match.params.configId);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Fields</h1>
        <button className="btn btn-primary" onClick={() => this.add()}>
          Add Field
        </button>
        <hr />
        {this.renderFields()}
      </div>
    );
  }
}
