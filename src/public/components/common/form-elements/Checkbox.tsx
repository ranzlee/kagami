import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface CheckboxState { }

export interface CheckboxProps extends FormControl.FormControlProps {
    inputId: string;
    label: string;
    isRequired: boolean;
    invalidFeedback?: string;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {};
    }

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        let required = this.props.isRequired ? true : false;
        return (
            <>
            <div className={extendedProps.labelClasses}></div>
            <div className={extendedProps.formControlClasses}>
                <div className="checkbox">
                    <input id={this.props.inputId} type="checkbox" className="custom-control-input" required={required} />
                    <label htmlFor={this.props.inputId} className="custom-control-label">{this.props.label}</label>
                    <div className="invalid-feedback">
                        {this.props.invalidFeedback ? this.props.invalidFeedback : ""}
                    </div>
                </div>
            </div>
            {extendedProps.children}
            </>
        )
    }
}
