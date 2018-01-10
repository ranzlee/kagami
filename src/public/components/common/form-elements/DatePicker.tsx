import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as $ from "jquery";

export interface DatePickerState extends FormControl.FormControlState {}

export interface DatePickerProps extends FormControl.FormControlProps {
  required?: boolean;
  //max?: Date;
  //min?: Date;
  //step?: number;
  value: string;
  placeholder: string;
}

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  constructor(props: DatePickerProps) {
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
    ($(thisInstance) as any)
      .datepicker({
        templates: {
          leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
          rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
        }
      })
      .on("show", () => {
        $(".datepicker").addClass("open");
        let datepicker_color = $(thisInstance).data("datepicker-color");
        if (datepicker_color && datepicker_color.length != 0) {
          $(".datepicker").addClass("datepicker-" + datepicker_color + "");
        }
      })
      .on("hide", () => {
        $(".datepicker").removeClass("open");
      });
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
  }

  render() {
    let required = this.props.required ? true : false;
    //let step = this.props.step ? this.props.step : null;
    //let max = this.props.max ? this.props.max.toDateString() : null;
    //let min = this.props.min ? this.props.min.toDateString() : null;
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
            className="form-control date-picker"
            id={
              this.props.id //*** end
            }
            name={this.props.name}
            type="text"
            value={this.props.value}
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
            //min={min}
            //max={max}
            //step={step}
            data-datepicker-color=""
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
