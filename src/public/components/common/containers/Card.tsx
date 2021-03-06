import * as React from "react";
import * as ReactDOM from "react-dom";
import { InfoTooltip } from "../widgets/InfoTooltip";

export interface CardState {}

export interface CardProps {
  iconName: string;
  title: string;
  toolTip?: string;
}

export class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {};
  }

  render() {
    let toolTip =
      this.props.toolTip && this.props.toolTip !== "" ? (
        <div className="float-right">
          <InfoTooltip title={this.props.toolTip} />
        </div>
      ) : null;
    let iconClass = "fas " + this.props.iconName;
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-light">
              <div className="text-primary">
                <div className="float-left">
                  <i className={iconClass} aria-hidden="true" />&nbsp;&nbsp;{
                    this.props.title
                  }
                </div>
                {toolTip}
                <div className="clearfix" />
              </div>
            </div>
            <div className="card-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
