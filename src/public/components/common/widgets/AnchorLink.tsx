import * as React from "react";
import * as ReactDOM from "react-dom";

export interface AnchorLinkState {}

export interface AnchorLinkProps {
  linkText: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export class AnchorLink extends React.Component<
  AnchorLinkProps,
  AnchorLinkState
> {
  constructor(props: AnchorLinkProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <a href="" onClick={this.props.onClick}>
        {this.props.linkText}
      </a>
    );
  }
}
