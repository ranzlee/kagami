import { RouteComponentProps } from "react-router";
import * as React from "react";
import Expression from "./../../../containers/configuration/expression/ExpressionContainer"

interface IRouteParams {
  expressionId: string;
}
export interface IOwnProps extends RouteComponentProps<IRouteParams> { }

export class ExpressionRouteWrapper extends React.Component<IOwnProps, {}> {

  render() {
    const { expressionId } = this.props.match.params;
    return (
        <Expression expressionId= { expressionId } />
      );
  }
}