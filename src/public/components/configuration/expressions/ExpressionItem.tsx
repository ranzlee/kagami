import * as React from "react";
import { ConfigElementType } from "../../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";
import { ExpressionRecord } from "./../../../../shared/models/configuration/elements/Expression";

export interface IOwnProps {
  expressionId: string;
}

export interface IConnectedState {
  expression: ExpressionRecord;
}

export interface IConnectedDispatch {
  delete: (expressionId: string) => void;
}

export class ExpressionItem extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{

  render() {
    const { expression } = this.props;
    const editUrl = "/configElement/expression/" + expression._id;

    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <label>Name: </label>
            <span>{expression.name}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <label>Description: </label>
            <span>{expression.description}</span>
          </div>
        </div>
        <div className="col-xs">
          <Link to={editUrl}>
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
