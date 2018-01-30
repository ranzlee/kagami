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
  min?: number;
  max?: number;
  step?: number;
  showToolTip?: boolean;
  showHorizontal?: boolean;
  verticalPixels?: number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomValidation?: (
    element: HTMLInputElement
  ) => FormControl.CustomValidationResult;
}

export class Slider extends React.Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      invalidFeedback: this.props.invalidFeedback,
      value: this.props.value
    };
  }

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
    this.renderSlider(true);
  }

  componentWillUnmount() {
    if (this.slider) {
      (this.slider as any).noUiSlider.off();
    }
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
        FormControl.OnChangeCustomValidation(this, this.instance);
      }
    }
  };

  hiddenOnChange() {}

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
          min: this.props.min ? this.props.min : 0,
          max: this.props.max ? this.props.max : 100
        },
        orientation: sliderOrientation,
        step: this.props.step ? this.props.step : 1,
        tooltips: this.props.showToolTip ? this.props.showToolTip : false
      });
      this.slider.style.marginTop = "20px";
      if (sliderOrientation === "vertical") {
        this.slider.style.height = this.props.verticalPixels + "px";
      }
      (this.slider as any).noUiSlider.on("change", this.onChange.bind(this));
      //keyboard accessibility
      (this.slider as any).setAttribute("tabindex", 0);
      (this.slider as any).addEventListener("click", () => {
        (this.slider as any).focus();
      });
      (this.slider as any).addEventListener("keydown", (e: any) => {
        var value = Number((this.slider as any).noUiSlider.get());
        switch (e.which) {
          case 37:
            (this.slider as any).noUiSlider.set(value - this.props.step);
            break;
          case 39:
            (this.slider as any).noUiSlider.set(value + this.props.step);
            break;
        }
      });
      //end keyboard accessibility
    }
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
    let sliderStyle = {
      outline: "none"
    };
    let myCustomStyle = {
      opacity: 0,
      height: "0px"
    };
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
            style={sliderStyle}
          />
          <input
            id={hiddenId}
            className="form-control"
            ref={instance => {
              this.instance = instance;
            }}
            type="text"
            style={myCustomStyle}
            value={this.state.value}
            onChange={this.hiddenOnChange}
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
