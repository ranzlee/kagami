import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";

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

  render() {
    const { field } = this.props;
    return <div>Field: {field.name}</div>;
  }
}