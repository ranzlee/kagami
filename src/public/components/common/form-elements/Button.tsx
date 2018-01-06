import * as React from "react";
import * as ReactDOM from "react-dom";

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
    let comp =
      this.props.type === "submit" ? (
        <button
          type="submit"
          className={buttonClasses}
          disabled={this.props.disabled}
        >
          {innerElement}
        </button>
      ) : (
        <button
          type="button"
          className={buttonClasses}
          disabled={this.props.disabled}
          onClick={this.onClick}
        >
          {innerElement}
        </button>
      );

    return comp;
  }
}
