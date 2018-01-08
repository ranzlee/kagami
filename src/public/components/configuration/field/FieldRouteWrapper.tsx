import { RouteComponentProps } from "react-router";
import * as React from "react";
import Field from "./../../../containers/configuration/field/FieldContainer"

interface IRouteParams {
  fieldId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export class FieldRouteWrapper extends React.Component<IOwnProps, {}> {

  render() {
    const { fieldId } = this.props.match.params;
    return (
        <Field fieldId= { fieldId } />
      );
  }
}