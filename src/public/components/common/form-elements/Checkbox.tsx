import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";

export interface CheckboxState extends FormControl.FormControlState {}

export interface CheckboxProps extends FormControl.FormControlProps {
  required?: boolean;
  checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLInputElement;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.readOnly != null && this.props.readOnly) {
      return;
    } else {
      if (
        this.props.form != null &&
        this.props.form.props.readOnly != null &&
        this.props.form.props.readOnly
      ) {
        return;
      }
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, event.currentTarget);
    }
  };

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
  }

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    let id = lodash.uniqueId(this.props.id);
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses} />
        <div className={extendedProps.formControlClasses}>
          <div className="checkbox">
            <input
              ref={instance => {
                this.instance = instance;
              }}
              id={id}
              type="checkbox"
              className="form-check-input custom-control-input"
              required={required}
              onChange={this.onChange}
              disabled={
                this.props.disabled != null
                  ? this.props.disabled
                  : this.props.form && this.props.form.props.disabled != null
                    ? this.props.form.props.disabled
                    : false
              }
              checked={this.props.checked}
            />
            <label className="form-check-label" htmlFor={id}>
              {this.props.label}
            </label>
            <div className="invalid-feedback">
              {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
