import * as React from "react";
import Config from "./../../../containers/configuration/fields/FieldsContainer";
import Field from "./../../../containers/configuration/field/FieldContainer"
import { RouteComponentProps } from "react-router";
import { Set } from "immutable";
import ExpressionItem from "./../../../containers/configuration/expressions/ExpressionItemContainer";

interface IRouteParams {
  configId: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export interface IConnectedState {
  expressionIds: Set<string>;
}

export interface IConnectedDispatch {
  add: (configId: string) => void;
}

export class Expressions extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  private renderFields(): JSX.Element[] {
    const { expressionIds } = this.props;
    if (!expressionIds) return null;

    var returnElements: JSX.Element[] = [];

    expressionIds.toIndexedSeq().toArray().forEach(expressionId => {
      returnElements.push(<ExpressionItem expressionId={expressionId} key={expressionId} />);
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
        <h1>Expressions</h1>
        <button className="btn btn-primary" onClick={() => this.add()}>
          Add Expression
        </button>
        <hr />
        {this.renderFields()}
      </div>
    );
  }
}