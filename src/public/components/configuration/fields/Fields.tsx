import * as React from "react";
import Config from "./../../../containers/configuration/fields/FieldsContainer";
import Field from "./../../../containers/configuration/field/FieldContainer"
import { RouteComponentProps } from "react-router";
import { Set } from "immutable";

interface IRouteParams {
  configId: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  fieldIds: Set<string>;
}

export interface IConnectedDispatch {
  add: (configId: string) => void;
}

export class Fields extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  private renderFields(): JSX.Element[] {
    const { fieldIds } = this.props;
    if (!fieldIds) return null;

    var returnElements: JSX.Element[] = [];

    fieldIds.toIndexedSeq().toArray().forEach(fieldId => {
      returnElements.push(<Field fieldId={fieldId} key={fieldId} />);
    });

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
