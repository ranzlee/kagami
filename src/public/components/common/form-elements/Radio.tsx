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
        return (
            options.map(function (option, index) {
                return (
                    <>
                    <div className="radio">
                        <input type="radio" name="radio1" id={"radio" + index.toString()} className="form-check-input" value={option} />
                        <label className="form-check-label" htmlFor={"radio" + index.toString()}>
                            Radio is {option}
                        </label>
                    </div>
                    </>
                )
            })
        );
    }
}
