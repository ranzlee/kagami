import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface ToggleState extends FormControl.FormControlState { }

export interface ToggleProps extends FormControl.FormControlProps {
    required?: boolean;
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {
    constructor(props: ToggleProps) {
        super(props);
        this.state = { invalidFeedback: this.props.invalidFeedback };
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        if (this.props.onChangeCustomValidation) {
            FormControl.OnChangeCustomValidation(this, event.currentTarget);
        }
    };

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        let required = this.props.required ? true : false;
        return (
            <div className="form-group">

            </div>
        );
    }
}
