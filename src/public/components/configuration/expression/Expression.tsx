import * as React from "react";
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
  update: (id: string,
    propertyName: string,
    newValue: any,
    oldValue: any) => void;
}

export class Expression extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

  updateClickHandler = (event: any) => {
    const { expression, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = expression[name];
    update(expression._id, name, value, oldValue);
  };

  render() {
    const { expression } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <Textbox
              id={'Expression_Name_' + expression._id}
              name="name"
              type="text"
              required={true}
              placeholder="Expression Name"
              label="Name: "
              value={expression.name}
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
              id={'Expression_Description_' + expression._id}
              name="description"
              label="Description: "
              placeholder="Description"
              value={expression.description}
              onChange={this.updateClickHandler}
              labelColLg={3}
              controlColLg={9}
              labelColSm={6}
              controlColSm={6}
              rows={5} />
          </div>
        </div>
      </div>
    )
  }
}