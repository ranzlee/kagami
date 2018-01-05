import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface RadioOptionState extends FormControl.FormControlState { }

export interface RadioOptionProps {
    label: string;
    value: string;
    name?: string;
    isRequired?: boolean;
    labelCol?: string;
    controlCol?: string;
    isLast?: boolean;
    invalidFeedback?: string;
}

export class RadioOption extends React.Component<RadioOptionProps, RadioOptionState> {
    constructor(props: RadioOptionProps) {
        super(props);
    }

    render() {
        let invalidFeedback = null;
        if (this.props.isLast) {
            invalidFeedback = <div className="invalid-feedback">
                {this.props.invalidFeedback ? this.props.invalidFeedback : ""}
            </div>
        }
        return <div className="row">
            <div className={this.props.labelCol} />
            <div className={this.props.controlCol}>
                <div className="radio">
                    <input
                        id={this.props.value}
                        type="radio"
                        className="form-check-input custom-control-input"
                        name={this.props.name}
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
