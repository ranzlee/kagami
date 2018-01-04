import * as React from "react";
import { Field as FieldModel } from "./../../../../shared/models/configuration/elements/Field";

export interface IOwnProps {
  fieldId: string;
  configId: string;
}

export interface IConnectedState {
  field: FieldModel;
}

export interface IConnectedDispatch {
  update: (id: string, 
    propertyName: string, 
    newValue: any, 
    oldValue: any) => void;
}

export class Field extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, {}> {

  render() {
    const { field } = this.props;
    return <div>Field: {field.name}</div>;
  }
}