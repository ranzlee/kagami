import * as React from "react";
import * as ReactDOM from "react-dom";
import { Form } from "./Form";

export interface ButtonState {}

export interface ButtonProps {
  type: "button" | "submit";
  className:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  buttonText: string;
  disabled?: boolean;
  iconName?: string;
  form?: Form;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }

  onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.props.onClick != null) {
      this.props.onClick(event);
    }
  };

  render() {
    let buttonClasses = "btn btn-" + this.props.className;
    let iconClasses = "fas " + this.props.iconName;
    let innerElement =
      this.props.iconName != null && this.props.iconName !== "" ? (
        <span>
          <i className={iconClasses} />&nbsp;&nbsp;{this.props.buttonText}
        </span>
      ) : (
        <span>{this.props.buttonText}</span>
      );
    return (
      <button
        type={this.props.type}
        className={buttonClasses}
        disabled={
          this.props.disabled != null
            ? this.props.disabled
            : this.props.form && this.props.form.props.disabled != null
              ? this.props.form.props.disabled
              : false
        }
      >
        {innerElement}
      </button>
    );
  }
}
