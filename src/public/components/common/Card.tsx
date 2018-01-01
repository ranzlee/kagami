import * as React from "react";
import * as ReactDOM from "react-dom";
import { InfoTooltip } from "./InfoTooltip";

export interface CardState {}

export interface CardProps {
  titleFaIconName: string;
  titleText: string;
  toolTip?: string;
  bodyContent: JSX.Element | React.Component;
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
    let iconClass = "fas " + this.props.titleFaIconName;
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-light">
              <div className="text-primary">
                <div className="float-left">
                  <i className={iconClass} aria-hidden="true" />&nbsp;&nbsp;{
                    this.props.titleText
                  }
                </div>
                {toolTip}
                <div className="clearfix" />
              </div>
            </div>
            <div className="card-body">{this.props.bodyContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
