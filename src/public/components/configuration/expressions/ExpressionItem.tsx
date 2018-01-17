import * as React from "react";
import { ConfigElementType } from "../../../../shared/models/enums/ConfigElementType";
import { Link } from "react-router-dom";
import { ExpressionRecord } from "./../../../../shared/models/configuration/elements/Expression";
import { Textbox } from "../../common/form-elements/Textbox";
import { TextArea } from "../../common/form-elements/TextArea";

export interface IOwnProps {
  expressionId: string;
}

export interface IConnectedState {
  expression: ExpressionRecord;
}

export interface IConnectedDispatch {
  delete: (expressionId: string) => void;
  update: (
    id: string,
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => void;
}

export class ExpressionItem extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}>
{
  updateClickHandler = (event: any) => {
    const { expression, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = expression[name];
    debugger;
    update(expression._id, name, value, oldValue);
  };
  
  render() {
    const { expression } = this.props;
    const editUrl = "/configElement/expression/" + expression._id;

    return (
      <div>
        <div className="row">
          <Textbox
            id={'Expression_Name_' + expression._id}
            name="name"
            type="text"
            required={true}
            placeholder="Expression Name"
            label="Name: "
            value={expression.name}
            onChange={this.updateClickHandler}
            labelColSm={3}
            controlColSm={9} />
        </div>
        <div className="row">
          <TextArea
            id={'Expression_Description_' + expression._id}
            name="description"
            label="Description: "
            placeholder="Expression Description"
            value={expression.description}
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
