import * as React from "react";
import { IField as FieldModel } from "./../../../../shared/models/configuration/elements/Field";
import { ConfigElementType } from "../../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";

export interface IOwnProps {
  id: string;
  configId: string;
}

export interface IConnectedState {
  field: FieldModel;
}

export interface IConnectedDispatch {
  update: (
    id: string,
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => void;
  delete: () => void;
}

export class FieldItem extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  updateClickHandler = (event: any) => {
    const { field, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = field[name];
    update(field._id, name, value, oldValue);
  };

  render() {
    const { field, update } = this.props;
    const editUrl = "./configElement/" + field._id;

    return (
      <div>
        <div className="row">
          <div className="col-xs">
            <label>Name:</label>
          </div>
          <div className="col-xs">
            <input
              type="text"
              className="form-control"
              placeholder="Configuration Name"
              aria-label="Configuration Name"
              name="name"
              value={field.name}
              onChange={this.updateClickHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <label>Description:</label>
          </div>
          <div className="col-xs">
            <textarea
              className="form-control"
              placeholder="Description"
              aria-label="Description"
              name="description"
              value={field.description}
              onChange={this.updateClickHandler}
            />
          </div>
          <div className="col-xs">
            <Link to={editUrl}>
              <button type="button" className="btn btn-primary">
                Edit
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
