import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as $ from "jquery";
import * as moment from "moment";

export interface DateTimeState extends FormControl.FormControlState {}

export interface DateTimeProps extends FormControl.FormControlProps {
  type: "date" | "datetime-local" | "time";
  dateKind: "utc" | "local";
  required?: boolean;
  max?: Date;
  min?: Date;
  step?: number;
  value: Date;
  placeholder: string;
}

export class DateTime extends React.Component<DateTimeProps, DateTimeState> {
  constructor(props: DateTimeProps) {
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
    let thisInstance = this.instance;
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
    let max = this.props.max
      ? this.props.dateKind === "utc"
        ? moment(this.props.max)
            .utc()
            .format(dateFormat)
        : moment(this.props.max)
            .local()
            .format(dateFormat)
      : "";

    let min = this.props.min
      ? this.props.dateKind === "utc"
        ? moment(this.props.min)
            .utc()
            .format(dateFormat)
        : moment(this.props.min)
            .local()
            .format(dateFormat)
      : "";
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
            type={this.props.type}
            value={
              this.props.value != null
                ? this.props.dateKind === "utc"
                  ? moment(this.props.value)
                      .utc()
                      .format(dateFormat)
                  : moment(this.props.value)
                      .local()
                      .format(dateFormat)
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
            min={min}
            max={max}
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
