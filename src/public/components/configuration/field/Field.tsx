import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { Textbox } from "../../common/form-elements/Textbox";
import { TextArea } from "../../common/form-elements/TextArea";
import { ExpressionRecord } from "../../../../shared/models/configuration/elements/Expression";
import { Select } from "../../common/form-elements/Select";

export interface IOwnProps {
  fieldId: string;
}

export interface IConnectedState {
  field: FieldRecord;
  expressions: ExpressionRecord[]
}

export interface IConnectedDispatch {
  update: (id: string,
    propertyName: string,
    newValue: any,
    oldValue: any) => void;
}

export class Field extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

  getExpressionOptions(): JSX.Element[] {
    var returnElements: JSX.Element[] = [];
    returnElements = this.props.expressions.map(i => (<option key={i._id} value={i._id}>{i.name}</option>));
    return returnElements;
  }

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Textbox
              id={'Field_Name_' + field._id}
              name="name"
              type="text"
              required={true}
              placeholder="Field Name"
              label="Name: "
              value={field.name}
              onChange={this.updateClickHandler}
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <TextArea
              id={'Field_Description_' + field._id}
              name="description"
              label="Description: "
              placeholder="Description"
              value={field.description}
              onChange={this.updateClickHandler}
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6}
              rows={5} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Select
              name="displayExpression"
              label="Display Expression"
              placeholderOption="Select"
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6}
              required={false}
              onChange={this.updateClickHandler}
              value={field.displayExpression}
            >
              {this.getExpressionOptions()}
            </Select>
          </div>
        </div>
      </div>
    )
  }
}