import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

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

  //*** every wrapped component needs this!
  instance: HTMLInputElement;
  //*** end

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.readOnly) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, event.currentTarget);
    }
  };

  //*** every wrapped component needs this!
  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
  }
  //*** end

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses} />
        <div className={extendedProps.formControlClasses}>
          <div className="checkbox">
            <input
              ref={instance => {
                //*** every wrapped component needs this!
                this.instance = instance;
              }}
              id={
                this.props.id //*** end
              }
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
              readOnly={
                this.props.readOnly != null
                  ? this.props.readOnly
                  : this.props.form && this.props.form.props.readOnly != null
                    ? this.props.form.props.readOnly
                    : false
              }
              checked={this.props.checked}
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
