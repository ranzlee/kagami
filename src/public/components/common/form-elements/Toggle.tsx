import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface ToggleState extends FormControl.FormControlState {}

export interface ToggleProps extends FormControl.FormControlProps {
  required?: boolean;
  checked: boolean;
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLInputElement;

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
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses}>{this.props.label}</div>
        <div className={extendedProps.formControlClasses}>
          <div className="bootstrap-switch">
            <input
              ref={instance => {
                this.instance = instance;
              }}
              id={this.props.id}
              type="checkbox"
              name="checkbox"
              className="bootstrap-switch"
              required={required}
              onChange={this.onChange}
              checked={this.props.checked}
            />
            <div className="invalid-feedback">
              {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
