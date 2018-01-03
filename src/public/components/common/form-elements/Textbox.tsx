import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface TextboxState {}

export interface TextboxProps extends FormControl.FormControlProps {
  inputId: string;
  inputType: "email" | "password" | "search" | "tel" | "text" | "url";
  pattern?: string;
  isRequired?: boolean;
  maxLength?: number;
  minLength?: number;
  label: string;
  invalidFeedback?: string;
  value: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Textbox extends React.Component<TextboxProps, TextboxState> {
  constructor(props: TextboxProps) {
    super(props);
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    let required = this.props.isRequired ? true : false;
    let pattern = this.props.pattern ? this.props.pattern : null;
    let maxLength = this.props.maxLength ? this.props.maxLength : null;
    let minLength = this.props.minLength ? this.props.minLength : null;
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label
          className={extendedProps.labelClasses}
          htmlFor={this.props.inputId}
        >
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            className="form-control"
            id={this.props.inputId}
            type={this.props.inputType}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            required={required}
            pattern={pattern}
            maxLength={maxLength}
            minLength={minLength}
          />
          <div className="invalid-feedback">
            {this.props.invalidFeedback ? this.props.invalidFeedback : ""}
          </div>
        </div>
        {extendedProps.children}
      </div>
    );
  }
}
