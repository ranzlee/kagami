import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface RadioState extends FormControl.FormControlState { }

export interface RadioProps extends FormControl.FormControlProps {
    required?: boolean;
}

export class Radio extends React.Component<RadioProps, RadioState> {
    constructor(props: RadioProps) {
        super(props);
        this.state = { invalidFeedback: this.props.invalidFeedback };
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        if (this.props.onChangeCustomValidation) {
            FormControl.OnChangeCustomValidation(this, event);
        }
    };

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        let required = this.props.required ? true : false;
        let options = ["On", "Off"];
        const rowLength = options.length;
        return (
            <>
            {options.map((option, index) => {
                let invalidFeedback = null;
                if (rowLength === index + 1) {
                    invalidFeedback = <div className="invalid-feedback">
                        {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
                    </div>
                }
                return (
                    <div className="row form-group" key={index}>
                        <div className={extendedProps.labelClasses} />
                        <div className={extendedProps.formControlClasses}>
                            <div className="radio">
                                <input
                                    id={"radio" + index.toString()}
                                    type="radio"
                                    className="form-check-input custom-control-input"
                                    name="radio1"
                                    required={required}
                                    value={option} />
                                <label className="form-check-label" htmlFor={"radio" + index.toString()}>
                                    Radio is {option}
                                </label>
                                {invalidFeedback}
                            </div>
                        </div>
                    </div>
                )
            })}
            </>
        );
    }
}
