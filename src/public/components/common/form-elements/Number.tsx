import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface NumberState extends FormControl.FormControlState {}

export interface NumberProps extends FormControl.FormControlProps {
  type: "range" | "number";
  required?: boolean;
  max?: number;
  min?: number;
  step?: number;
  value: number;
  placeholder: string;
}

export class Number extends React.Component<NumberProps, NumberState> {
  constructor(props: NumberProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  //*** every wrapped component needs this!
  instance: HTMLInputElement;
  //*** end

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    let required = this.props.required ? true : false;
    let step = this.props.step ? this.props.step : null;
    let max = this.props.max ? this.props.max : null;
    let min = this.props.min ? this.props.min : null;
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              //*** every wrapped component needs this!
              this.instance = instance;
            }}
            className="form-control"
            id={
              this.props.id //*** end
            }
            name={this.props.name}
            type={this.props.type}
            value={this.props.value.toString()}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
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
        {extendedProps.children}
      </div>
    );
  }
}
