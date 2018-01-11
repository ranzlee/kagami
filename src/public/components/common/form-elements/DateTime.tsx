import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as $ from "jquery";
import { Moment } from "moment";

export interface DateTimeState extends FormControl.FormControlState {}

export interface DateTimeProps extends FormControl.FormControlProps {
  type: "date" | "datetime-local" | "time";
  required?: boolean;
  max?: Moment;
  min?: Moment;
  step?: number;
  value: Moment;
  placeholder: string;
}

export class DateTime extends React.Component<DateTimeProps, DateTimeState> {
  constructor(props: DateTimeProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
    this.dateInputSupported = true;
  }

  instance: HTMLInputElement;
  dateInputSupported: boolean;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, event.currentTarget);
    }
  };

  componentDidMount() {
    if ($(this.instance).prop("type") != "date") {
      this.dateInputSupported = false;
    }
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
  }

  render() {
    let dateFormat = "YYYY-MM-DD";
    let required = this.props.required ? true : false;
    let step = this.props.step ? this.props.step : "";
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              this.instance = instance;
            }}
            className="form-control"
            id={this.props.id}
            name={this.props.name}
            type={this.dateInputSupported ? this.props.type : "text"}
            value={
              this.props.value != null && this.props.value.isValid()
                ? this.props.value.isUTC()
                  ? this.props.value.format(dateFormat)
                  : this.props.value.utc().format(dateFormat)
                : ""
            }
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
            min={
              this.props.min != null
                ? this.props.min.isUTC()
                  ? this.props.min.format(dateFormat)
                  : this.props.min.utc().format(dateFormat)
                : ""
            }
            max={
              this.props.max != null
                ? this.props.max.isUTC()
                  ? this.props.max.format(dateFormat)
                  : this.props.max.utc().format(dateFormat)
                : ""
            }
            step={step}
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
