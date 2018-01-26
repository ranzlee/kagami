import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { Textbox } from "../../common/form-elements/Textbox";
import { TextArea } from "../../common/form-elements/TextArea";
import { ExpressionRecord } from "../../../../shared/models/configuration/elements/Expression";
import { Select } from "../../common/form-elements/Select";
import { ConfigElementDropDown } from "./../dropDown/ConfigElementDropDown";
import { Addresses } from "../../address/Addresses";
import { Form } from "../../common/form-elements/Form";
import { Button } from "../../common/form-elements/Button";
import Expression from "./../../../containers/configuration/expression/ExpressionContainer";
import { AnchorLink } from "./../../common/widgets/AnchorLink";
import { Card } from "./../../common/containers/Card";

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
  addFieldAddress: (fieldId: string) => void;
  updateFieldAddress: (fieldId: string,
    addressIndex: number,
    propertyName: string,
    newValue: any,
    oldValue: any) => void;
}

export interface IPrivateState {
  showDisplayExpressionInline: boolean;
}

export class Field extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, IPrivateState> {
  constructor(props: IOwnProps & IConnectedState & IConnectedDispatch) {
    super(props);
    this.state = { showDisplayExpressionInline: false };
  }

  updateClickHandler = (event: any) => {
    const { field, update } = this.props;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const oldValue = field[name];
    update(field._id, name, value, oldValue);
  };

  addressChange(index: number, propertyName: string, newValue: any, oldValue: any) {
    const { field, updateFieldAddress } = this.props;
    updateFieldAddress(field._id, index, propertyName, newValue, oldValue);
  }

  handleSubmit() {
    alert("Valid!");
  }

  render() {
    const { field, expressions, addFieldAddress } = this.props;
    return (
      <div className="container-fluid">
        <Form
          onSubmit={this.handleSubmit}
          validateOnMount={false}>
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
            {this.state.showDisplayExpressionInline ?
              (<Card title="Inline Expression View" iconName="fa-cog">
                <Expression expressionId={field.displayExpression} />
              </Card>)
              :
              (
                <div className="col-lg-6 col-sm-12">
                  <ConfigElementDropDown
                    configElements={expressions}
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
                  />
                </div>
              )
            }
            <AnchorLink
              linkText="Show/Hide Display Expression Inline"
              onClick={() => this.setState({ showDisplayExpressionInline: !this.state.showDisplayExpressionInline })}
            />
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <ConfigElementDropDown
                configElements={expressions}
                name="readonlyExpression"
                label="Readonly Expression"
                placeholderOption="Select"
                labelColLg={3}
                controlColLg={9}
                labelColSm={6}
                controlColSm={6}
                required={false}
                onChange={this.updateClickHandler}
                value={field.readonlyExpression}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <ConfigElementDropDown
                configElements={expressions}
                name="defaultValueExpression"
                label="Default Value Expression"
                placeholderOption="Select"
                labelColLg={3}
                controlColLg={9}
                labelColSm={6}
                controlColSm={6}
                required={false}
                onChange={this.updateClickHandler}
                value={field.defaultValueExpression}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => addFieldAddress(field._id)}>
            Add Address
        </button>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <Addresses addresses={field.addresses} onChange={
                (index: number, propertyName: string, newValue: any, oldValue: any) => this.addressChange(index, propertyName, newValue, oldValue)} />
            </div>
          </div>
          <Button
            type="submit"
            className="primary"
            buttonText="Validate"
            iconName="fa-check"
          />
        </Form>
      </div>
    )
  }
}