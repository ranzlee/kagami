import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ButtonState {}

export interface ButtonProps {
  buttonType: "button" | "submit";
  buttonClassName:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  buttonText: string;
  buttonFaIconName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }

  onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.onClick(event);
  };

  render() {
    let buttonClasses = "btn btn-" + this.props.buttonClassName;
    let iconClasses = "fas " + this.props.buttonFaIconName;
    let innerElement =
      this.props.buttonFaIconName != null &&
      this.props.buttonFaIconName !== "" ? (
        <span>
          <i className={iconClasses} />&nbsp;&nbsp;{this.props.buttonText}
        </span>
      ) : (
        <span>{this.props.buttonText}</span>
      );
    let comp =
      this.props.buttonType === "submit" ? (
        <button type="submit" className={buttonClasses}>
          {innerElement}
        </button>
      ) : (
        <button type="button" className={buttonClasses} onClick={this.onClick}>
          {innerElement}
        </button>
      );

    return comp;
  }
}
