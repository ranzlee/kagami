import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { Textbox } from "../../common/form-elements/Textbox";

export interface IOwnProps {
  fieldId: string;
}

export interface IConnectedState {
  field: FieldRecord;
}

export interface IConnectedDispatch {
  update: (id: string,
    propertyName: string,
    newValue: any,
    oldValue: any) => void;
}

export class Field extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

  updateClickHandler = (event: any) => {
    const { field, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = field[name];
    update(field._id, name, value, oldValue);
  };

  render() {
    const { field } = this.props;
    return (
      <div>
        <div className="row">
          <Textbox
            id={'Field_' + field._id}
            name="name"
            type="text"
            required={true}
            placeholder="Field Name"
            label="Name: "
            value={field.name}
            onChange={this.updateClickHandler}
            labelColSm={3}
            controlColSm={9} />
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
        </div>
      </div>
    )
  }
}