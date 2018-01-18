import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";

export interface NumberboxState extends FormControl.FormControlState {}

export interface NumberboxProps extends FormControl.FormControlProps {
  type: "range" | "number";
  required?: boolean;
  max?: number;
  min?: number;
  step?: number;
  value: number;
  placeholder: string;
}

export class Numberbox extends React.Component<NumberboxProps, NumberboxState> {
  constructor(props: NumberboxProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLInputElement;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    let required = this.props.required ? true : false;
    let step = this.props.step ? this.props.step : null;
    let max = this.props.max ? this.props.max : null;
    let min = this.props.min ? this.props.min : null;
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let id = lodash.uniqueId(this.props.id);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              this.instance = instance;
            }}
            className="form-control"
            id={id}
            name={this.props.name}
            type={this.props.type}
            value={this.props.value.toString()}
            placeholder={this.props.placeholder}
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
            onChange={this.onChange}
            required={required}
            step={step}
            max={max}
            min={min}
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
