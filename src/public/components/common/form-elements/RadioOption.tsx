import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface RadioOptionState extends FormControl.FormControlState { }

export interface RadioOptionProps extends FormControl.FormControlProps {
    label: string;
    value: string;
    name?: string;
    isRequired?: boolean;
    isLast?: boolean;
    invalidFeedback?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class RadioOption extends React.Component<RadioOptionProps, RadioOptionState> {
    constructor(props: RadioOptionProps) {
        super(props);
    }

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        let invalidFeedback = null;
        if (this.props.isLast) {
            invalidFeedback = <div className="invalid-feedback">
                {this.props.invalidFeedback ? this.props.invalidFeedback : ""}
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
                        name={this.props.name}
                        onChange={this.props.onChange}
                        required={this.props.isRequired}
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
