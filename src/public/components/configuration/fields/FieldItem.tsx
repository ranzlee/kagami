import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { ConfigElementType } from "../../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";
import { Textbox } from "../../common/form-elements/Textbox";
import { TextArea } from "../../common/form-elements/TextArea";

export interface IOwnProps {
  fieldId: string;
}

export interface IConnectedState {
  field: FieldRecord;
}

export interface IConnectedDispatch {
  delete: (fieldId: string) => void;
  update: (
    id: string,
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => void;
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
    const { field } = this.props;
    const editUrl = "/configElement/field/" + field._id;

    return (
      <div>
        <div className="row">
          <Textbox
            id={'Field_Name_' + field._id}
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
          <TextArea
            id={'Field_Description_' + field._id}
            name="description"
            label="Description: "
            placeholder="Field Description"
            value={field.description}
            onChange={this.updateClickHandler}
            labelColSm={3}
            controlColSm={6}
            rows={5} />
          <div className="col-sm">
            <Link to={editUrl}>
              <button type="button" className="btn btn-primary">
                Edit
            </button>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}