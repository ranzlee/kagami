import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
const noUiSlider = require("../../../assets/css/themes/now-ui/js/plugins/nouislider.min.js");
import * as lodash from "lodash";

export interface SliderState extends FormControl.FormControlState {
  value: number;
}

export interface SliderProps extends FormControl.FormControlProps {
  value: number;
  step?: number;
  showToolTip?: boolean;
  showHorizontal?: boolean;
  required?: boolean;
}

export class Slider extends React.Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      invalidFeedback: this.props.invalidFeedback,
      value: this.props.value
    };
  }

  instance: HTMLInputElement;
  slider: HTMLDivElement;

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
    //set the hidden input to the selected slider value
    if (this.slider) {
      this.instance.value = (this.slider as any).noUiSlider.get();
      if (this.props.onChangeCustomValidation) {
        this.props.onChangeCustomValidation(this.instance);
        FormControl.OnChangeCustomValidation(this, this.instance);
      }
    }
  };

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }

    this.renderSlider(true);
  }

  renderSlider(createSlider: boolean) {
    if (this.slider == null) return;
    const sliderOrientation =
      this.props.showHorizontal == null || this.props.showHorizontal
        ? "horizontal"
        : "vertical";
    const sliderDisabled =
      this.props.disabled != null
        ? this.props.disabled
        : this.props.form && this.props.form.props.disabled != null
          ? this.props.form.props.disabled
          : false;
    const sliderReadOnly =
      this.props.readOnly != null
        ? this.props.readOnly
        : this.props.form && this.props.form.props.readOnly != null
          ? this.props.form.props.readOnly
          : false;
    if (createSlider) {
      noUiSlider.create(this.slider, {
        start: this.props.value,
        connect: [true, false],
        range: {
          min: 0,
          max: 100
        },
        orientation: sliderOrientation,
        step: this.props.step ? this.props.step : 1,
        tooltips: this.props.showToolTip ? this.props.showToolTip : false
      });
      this.slider.style.marginTop = "20px";
    }
    (this.slider as any).noUiSlider.on("change", this.onChange.bind(this));
    if (sliderDisabled || sliderReadOnly) {
      this.slider.setAttribute("disabled", "true");
    } else {
      this.slider.removeAttribute("disabled");
    }
  }

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    let sliderId = lodash.uniqueId("slider");
    let hiddenId = lodash.uniqueId("hiddenSlider");
    this.renderSlider(false);
    return (
      <div className="row form-group">
        <div className={extendedProps.labelClasses}>{this.props.label}</div>
        <div className={extendedProps.formControlClasses}>
          <div
            ref={slider => {
              this.slider = slider;
            }}
            id={sliderId}
            className="slider"
          />
          <input
            id={hiddenId}
            ref={instance => {
              this.instance = instance;
            }}
            type="hidden"
            value={this.state.value}
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
