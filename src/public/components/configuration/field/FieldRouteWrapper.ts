import { RouteComponentProps } from "react-router";
import * as React from "react";
import {Field} from "./../../../containers/configuration/field/FieldContainer"

interface IRouteParams {
    fieldId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

  export class Field extends React.Component<IOwnProps, {}> {
    
    render() {
        const { fieldId } = this.props;
        return (<Field fieldId={fieldId}/>)
    }
  }