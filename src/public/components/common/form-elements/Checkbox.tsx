import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface CheckboxState extends FormControl.FormControlState { }

export interface CheckboxProps extends FormControl.FormControlProps {
  required?: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, event);
    }
  };

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses} />
        <div className={extendedProps.formControlClasses}>
          <div className="checkbox">
            <input
              id={this.props.id}
              type="checkbox"
              className="form-check-input"
              required={required}
            />
            <label className="form-check-label" htmlFor={this.props.id}>
              {this.props.label}
            </label>
            <div className="invalid-feedback">
              {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
            </div>
          </div>
        </div>
        {extendedProps.children}
      </div>
    );
  }
}
