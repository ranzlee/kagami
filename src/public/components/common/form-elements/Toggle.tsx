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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomValidation?: (
    element: HTMLInputElement
  ) => FormControl.CustomValidationResult;
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
    if (this.instance) {
      ($(this.instance) as any).bootstrapSwitch("size", "small");
      ($(this.instance) as any).bootstrapSwitch("onText", this.props.labelOn);
      ($(this.instance) as any).bootstrapSwitch("offText", this.props.labelOff);
    }
  }

  componentWillUnmount() {
    if (this.instance) {
      ($(this.instance) as any).bootstrapSwitch("destroy");
    }
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

  render() {
    if (this.instance) {
      ($(this.instance) as any).bootstrapSwitch(
        "disabled",
        this.props.disabled ||
          (this.props.form && this.props.form.props.disabled)
      );
      ($(this.instance) as any).bootstrapSwitch(
        "readonly",
        this.props.readOnly ||
          (this.props.form && this.props.form.props.readOnly)
      );
    }
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
