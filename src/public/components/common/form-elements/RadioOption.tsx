import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { Radio } from "./Radio";
import * as lodash from "lodash";

export interface RadioOptionState {}

export interface RadioOptionProps {
  value: string;
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
  radio?: Radio;
}

export class RadioOption extends React.Component<
  RadioOptionProps,
  RadioOptionState
> {
  constructor(props: RadioOptionProps) {
    super(props);
  }

  instance: HTMLInputElement;

  componentDidMount() {
    if (this.props.radio) {
      this.props.radio.registerRadioOption(this.instance);
    }
  }

  render() {
    let extendedProps = FormControl.FormControlExtendedProperties(
      this.props.radio.props
    );
    let invalidFeedback = null;
    let id = lodash.uniqueId(this.props.value);
    if (this.props.isLast) {
      invalidFeedback = (
        <div className="invalid-feedback">
          {this.props.radio.state.invalidFeedback
            ? this.props.radio.state.invalidFeedback
            : ""}
        </div>
      );
    }
    return (
      <div className="row">
        <div className={extendedProps.labelClasses}>
          {this.props.isFirst ? this.props.radio.props.label : ""}
        </div>
        <div className={extendedProps.formControlClasses}>
          <div className="radio">
            <input
              ref={instance => {
                this.instance = instance;
              }}
              id={id}
              type="radio"
              className="form-check-input custom-control-input"
              name={this.props.radio.props.id}
              disabled={
                this.props.radio.props.disabled != null
                  ? this.props.radio.props.disabled
                  : this.props.radio.props.form &&
                    this.props.radio.props.form.props.disabled != null
                    ? this.props.radio.props.form.props.disabled
                    : false
              }
              onChange={this.props.radio.onChange}
              required={this.props.radio.props.required}
              value={this.props.value}
              checked={this.props.radio.props.value === this.props.value}
            />
            <label className="form-check-label" htmlFor={id}>
              {this.props.label}
            </label>
            {invalidFeedback}
          </div>
        </div>
      </div>
    );
  }
}
