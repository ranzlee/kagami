import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as $ from "jquery";
import * as Moment from "moment";
import * as ReactDatePicker from "react-datepicker";

export interface DateTimePickerState extends FormControl.FormControlState {
  selectedMoment: Moment.Moment;
  dateFormat: string;
  timeFormat: string;
  timeIntervalInMinutes: number;
}

export interface DateTimePickerProps extends FormControl.FormControlProps {
  value: Moment.Moment;
  placeholder: string;
  todayButton?: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  required?: boolean;
  minDate?: Moment.Moment;
  maxDate?: Moment.Moment;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervalInMinutes?: 0 | 15 | 30 | 60;
}

export class DateTimePicker extends React.Component<
  DateTimePickerProps,
  DateTimePickerState
> {
  constructor(props: DateTimePickerProps) {
    super(props);
    let dateFormat =
      this.props.dateFormat != null ? this.props.dateFormat : "MM/DD/YYYY";
    let timeFormat =
      this.props.timeFormat != null ? this.props.timeFormat : "hh:mm A";
    this.state = {
      selectedMoment: Moment(),
      invalidFeedback: "",
      dateFormat: dateFormat,
      timeFormat: timeFormat,
      timeIntervalInMinutes: this.props.timeIntervalInMinutes
        ? this.props.timeIntervalInMinutes
        : 15
    };
  }

  componentDidMount() {}

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  onTextChange = (moment: Moment.Moment) => {
    this.setState({ selectedMoment: moment });
  };

  childInput: HTMLInputElement;

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
              this.setState({ selectedMoment: moment });
            }}
            fixedHeight={true}
            placeholderText={this.props.placeholder}
            selected={this.state.selectedMoment}
            minDate={minDate}
            maxDate={maxDate}
            todayButton={this.props.todayButton}
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
  invalidFeedback: string;
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
      useProps: true,
      invalidFeedback: this.props.component.props.invalidFeedback
    };
  }

  componentDidMount() {
    this.doMomentValidation(this.instance.value);
  }

  instance: HTMLInputElement;

  getMomentFormat = () => {
    if (this.props.component.props.showTimeSelect) {
      return (
        this.props.component.state.dateFormat +
        " " +
        this.props.component.state.timeFormat
      );
    }
    return this.props.component.state.dateFormat;
  };

  doMomentValidation = (val: string) => {
    this.instance.setCustomValidity("");
    let m = Moment(val, this.getMomentFormat());
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
        this.props.component.state.timeIntervalInMinutes !== 0
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
    } else {
      this.instance.setCustomValidity("*");
    }
  };

  render() {
    let style = {
      marginLeft: "10px"
    };
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
        <div className="float-left">
          <input
            ref={instance => {
              this.instance = instance;
              this.props.instanceSetCallback(this.instance);
            }}
            type="text"
            className="form-control"
            value={
              this.state.useProps
                ? this.props.component.state.selectedMoment != null &&
                  this.props.component.state.selectedMoment.isValid()
                  ? this.props.component.state.selectedMoment.format(
                      this.getMomentFormat()
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
              if (val === "") {
                this.setState({ useProps: true }, () => {
                  this.props.component.onTextChange(null);
                });
              } else {
                let m = Moment(val, this.getMomentFormat());
                this.setState({ useProps: true }, () => {
                  if (m.isValid()) {
                    this.props.component.onTextChange(m);
                  }
                });
              }
            }}
          />
          <div className="invalid-feedback">{this.state.invalidFeedback}</div>
        </div>
        <div className="float-left">
          <button
            style={style}
            type="button"
            disabled={disabled || readOnly}
            onClick={this.props.onClick}
            className="btn btn-primary btn-icon btn-sm  btn-icon-mini btn-round"
          >
            <i className="fas fa-calendar" />
          </button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
