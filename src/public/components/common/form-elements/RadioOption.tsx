import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { Radio } from './Radio';

export interface RadioOptionState extends FormControl.FormControlState { }

export interface RadioOptionProps extends FormControl.FormControlProps {
    label: string;
    value: string;
    isLast?: boolean;
    radio?: Radio;
}

export class RadioOption extends React.Component<RadioOptionProps, RadioOptionState> {
    constructor(props: RadioOptionProps) {
        super(props);
    }

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props.radio.props);
        let invalidFeedback = null;
        if (this.props.isLast) {
            invalidFeedback = <div className="invalid-feedback">
                {this.props.radio.props.invalidFeedback ? this.props.radio.props.invalidFeedback : ""}
            </div>
        }
        return <div className="row">
            <div className={extendedProps.labelClasses} />
            <div className={extendedProps.formControlClasses}>
                <div className="radio">
                    <input
                        id={this.props.value}
                        type="radio"
                        className="form-check-input custom-control-input"
                        name={this.props.radio.props.name}
                        onChange={this.props.radio.onChange}
                        required={this.props.radio.props.required}
                        value={this.props.value} />
                    <label className="form-check-label" htmlFor={this.props.value}>
                        {this.props.label}
                    </label>
                    {invalidFeedback}
                </div>
            </div>
        </div>;
    }
}
