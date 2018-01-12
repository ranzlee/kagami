import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { ConfigElementType } from "../../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";

export interface IOwnProps {
  fieldId: string;
}

export interface IConnectedState {
  field: FieldRecord;
}

export interface IConnectedDispatch {
  delete: (fieldId: string) => void;
}

export class FieldItem extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{

  render() {
    const { field } = this.props;
    const editUrl = "/configElement/field/" + field._id;

    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <label>Name: </label>
            <span>{field.name}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <label>Description: </label>
            <span>{field.description}</span>
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
