import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
const noUiSlider = require("../../../assets/css/themes/now-ui/js/plugins/nouislider.min.js");

export interface SliderState extends FormControl.FormControlState {}

export interface SliderProps extends FormControl.FormControlProps {
  value: number;
  required?: boolean;
}

export class Slider extends React.Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLInputElement;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.readOnly != null && this.props.readOnly) {
      return;
    } else {
      if (
        this.props.form != null &&
        this.props.form.props.readOnly != null &&
        this.props.form.props.readOnly
      ) {
        return;
      }
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

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: this.props.value,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });
  }

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses} />
        <div className={extendedProps.formControlClasses}>
          <div id="sliderRegular" className="slider" />
          {/* <div className="checkbox">
            <input
              ref={instance => {
                this.instance = instance;
              }}
              id={
                this.props.id
              }
              type="checkbox"
              className="form-check-input custom-control-input"
              required={required}
              onChange={this.onChange}
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
              checked={this.props.checked}
            />
            <label className="form-check-label" htmlFor={this.props.id}>
              {this.props.label}
            </label>
            <div className="invalid-feedback">
              {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
