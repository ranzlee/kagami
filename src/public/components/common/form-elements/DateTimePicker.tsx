import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as $ from "jquery";
import * as Moment from "moment";
import * as ReactDatePicker from "react-datepicker";
require("jquery-mask-plugin");

export interface DateTimePickerState extends FormControl.FormControlState {
  selectedMoment: Moment.Moment;
  dateFormat: string;
  timeFormat: string;
  timeIntervalInMinutes: number;
}

export interface DateTimePickerProps extends FormControl.FormControlProps {
  value: Moment.Moment;
  placeholder: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  required?: boolean;
  minDate?: Moment.Moment;
  maxDate?: Moment.Moment;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervalInMinutes?: 1 | 5 | 10 | 15 | 30 | 60;
  useInputMask?: boolean;
}

export class DateTimePicker extends React.Component<
  DateTimePickerProps,
  DateTimePickerState
  > {
  constructor(props: DateTimePickerProps) {
    super(props);
    let dateFormat =
      this.props.dateFormat != null
        ? this.props.dateFormat
        : this.defaultDateFormat;
    let timeFormat =
      this.props.timeFormat != null
        ? this.props.timeFormat
        : this.defaultTimeFormat;
    this.state = {
      selectedMoment: this.props.value,
      invalidFeedback: this.props.invalidFeedback,
      dateFormat: dateFormat,
      timeFormat: timeFormat,
      timeIntervalInMinutes: this.props.timeIntervalInMinutes
        ? this.props.timeIntervalInMinutes
        : 15
    };
  }

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.childInput, this.state.selectedMoment);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.childInput);
    }
  }

  getMomentFormat = () => {
    if (this.props.showTimeSelect) {
      return (
        this.state.dateFormat +
        " " +
        this.state.timeFormat
      );
    }
    return this.state.dateFormat;
  };

  onChange = (moment: Moment.Moment) => {
    if (this.props.onChange) {
      this.props.onChange(moment);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, this.childInput, moment);
    }
  };

  onTextChange = (moment: Moment.Moment) => {
    this.onChange(moment);
    this.setState({ selectedMoment: moment });
  };

  childInput: HTMLInputElement;
  defaultDateFormat: string = "MM/DD/YYYY";
  defaultTimeFormat: string = "hh:mm A";

  onChildInstanceSet = (input: HTMLInputElement) => {
    this.childInput = input;
  };

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let minDate =
      this.props.minDate != null && this.props.minDate.isValid()
        ? this.props.minDate
        : null;
    let maxDate =
      this.props.maxDate != null && this.props.maxDate.isValid()
        ? this.props.maxDate
        : null;
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <ReactDatePicker.default
            customInput={
              <DateTimePickerInput
                component={this}
                instanceSetCallback={this.onChildInstanceSet}
              />
            }
            onChange={(moment: Moment.Moment) => {
              this.childInput.setCustomValidity("");
              this.onChange(moment);
              this.setState({ selectedMoment: moment });
            }}
            fixedHeight={true}
            placeholderText={this.props.placeholder}
            selected={this.state.selectedMoment}
            minDate={minDate}
            maxDate={maxDate}
            showYearDropdown={this.props.showYearDropdown}
            showMonthDropdown={this.props.showMonthDropdown}
            dateFormat={this.state.dateFormat}
            showTimeSelect={this.props.showTimeSelect}
            timeFormat={this.state.timeFormat}
            timeIntervals={this.state.timeIntervalInMinutes}
          />
        </div>
      </div>
    );
  }
}

export interface DateTimePickerInputState {
  value: string;
  useProps: boolean;
}

export interface DateTimePickerInputProps {
  component: DateTimePicker;
  instanceSetCallback: (input: HTMLElement) => void;
  onClick?: any;
}

export class DateTimePickerInput extends React.Component<
  DateTimePickerInputProps,
  DateTimePickerInputState
  > {
  constructor(props: DateTimePickerInputProps) {
    super(props);
    this.state = {
      value: "",
      useProps: true
    };
  }

  componentDidMount() {
    if (this.props.component.props.useInputMask) {
      if (this.props.component.props.showTimeSelect) {
        if (
          this.props.component.state.dateFormat ===
          this.props.component.defaultDateFormat &&
          this.props.component.state.timeFormat ===
          this.props.component.defaultTimeFormat
        ) {
          ($(this.instance) as any).mask("T0/D0/0000 T0:M0 AZ", {
            placeholder: "MM/DD/YYYY hh:mm AM",
            translation: {
              T: {
                pattern: /[0-1]/,
                optional: false
              },
              D: {
                pattern: /[0-3]/,
                optional: false
              },
              M: {
                pattern: /[0-5]/,
                optional: false
              },
              A: {
                pattern: /[AaPp]/,
                optional: false
              },
              Z: {
                pattern: /[Mm]/,
                optional: false
              }
            },
            onChange: () => {
              this.doMomentValidation(this.instance.value);
            }
          });
        }
      } else {
        if (
          this.props.component.state.dateFormat ===
          this.props.component.defaultDateFormat
        ) {
          ($(this.instance) as any).mask("T0/D0/0000", {
            placeholder: "MM/DD/YYYY",
            translation: {
              T: {
                pattern: /[0-1]/,
                optional: false
              },
              D: {
                pattern: /[0-3]/,
                optional: false
              }
            },
            onChange: () => {
              this.doMomentValidation(this.instance.value);
            }
          });
        }
      }
    }
    this.doMomentValidation(this.instance.value);
  }

  instance: HTMLInputElement;

  doMomentValidation = (val: string): Moment.Moment | null => {
    this.instance.setCustomValidity("");
    let m = Moment(val, this.props.component.getMomentFormat());
    if (m.isValid()) {
      //min date validation
      if (this.props.component.props.minDate != null) {
        if (!m.isSameOrAfter(this.props.component.props.minDate, "day")) {
          this.instance.setCustomValidity("*");
        }
      }
      //max date validation
      if (this.props.component.props.maxDate != null) {
        if (!m.isSameOrBefore(this.props.component.props.maxDate, "day")) {
          this.instance.setCustomValidity("*");
        }
      }
      //time interval validation
      if (
        this.props.component.props.showTimeSelect &&
        this.props.component.state.timeIntervalInMinutes !== 1
      ) {
        if (m.minute() !== 0) {
          if (
            m.minute() % this.props.component.state.timeIntervalInMinutes !==
            0
          ) {
            this.instance.setCustomValidity("*");
          }
        }
      }
      return m;
    } else {
      this.instance.setCustomValidity("*");
      return null;
    }
  };
  

  render() {
    let buttonStyle = {
      marginTop: 0,
      marginBottom: 0
    };
    let inputStyle = {
      maxWidth: this.props.component.props.showTimeSelect ? "195px" : "130px"
    }
    let disabled =
      this.props.component.props.disabled != null
        ? this.props.component.props.disabled
        : this.props.component.props.form &&
          this.props.component.props.form.props.disabled != null
          ? this.props.component.props.form.props.disabled
          : false;
    let readOnly =
      this.props.component.props.readOnly != null
        ? this.props.component.props.readOnly
        : this.props.component.props.form &&
          this.props.component.props.form.props.readOnly != null
          ? this.props.component.props.form.props.readOnly
          : false;
    return (
      <div>
        <div className="input-group">
          <input
            ref={instance => {
              this.instance = instance;
              this.props.instanceSetCallback(this.instance);
            }}
            type="text"
            className="form-control"
            style={inputStyle}
            value={
              this.state.useProps
                ? this.props.component.state.selectedMoment != null &&
                  this.props.component.state.selectedMoment.isValid()
                  ? this.props.component.state.selectedMoment.format(
                    this.props.component.getMomentFormat()
                  )
                  : ""
                : this.state.value
            }
            required={this.props.component.props.required}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={this.props.component.props.placeholder}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              let val = event.currentTarget.value;
              this.doMomentValidation(val);
              this.setState({ useProps: false, value: val });
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              let val = event.currentTarget.value;
              let result = this.doMomentValidation(val);
              this.setState({ useProps: true }, () => {
                this.props.component.onTextChange(result);
              });
            }}
          />
          <div className="input-group-append">
            <button
              style={buttonStyle}
              type="button"
              disabled={disabled || readOnly}
              onClick={this.props.onClick}
              className="btn btn-primary btn-icon"
            >
              <i className="fas fa-calendar" />
            </button>
          </div>
          <div className="invalid-feedback">{this.props.component.state.invalidFeedback}</div>
        </div>
      </div>
    );
  }
}
