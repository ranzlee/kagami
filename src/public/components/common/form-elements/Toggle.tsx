import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";

export interface ToggleState extends FormControl.FormControlState {}

export interface ToggleProps extends FormControl.FormControlProps {
  required?: boolean;
  checked: boolean;
  labelOn?: string;
  labelOff?: string;
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
    ($("[name='checkbox']") as any).bootstrapSwitch("size", "small");
    ($("[name='checkbox']") as any).bootstrapSwitch(
      "onText",
      this.props.labelOn
    );
    ($("[name='checkbox']") as any).bootstrapSwitch(
      "offText",
      this.props.labelOff
    );
  }

  render() {
    ($("[name='checkbox']") as any).bootstrapSwitch(
      "disabled",
      this.props.disabled || this.props.form.props.disabled
    );
    ($("[name='checkbox']") as any).bootstrapSwitch(
      "readonly",
      this.props.readOnly || this.props.form.props.readOnly
    );
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    let id = lodash.uniqueId(this.props.id);
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses}>{this.props.label}</div>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              this.instance = instance;
            }}
            id={id}
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
    );
  }
}
