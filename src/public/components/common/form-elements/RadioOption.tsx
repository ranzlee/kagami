import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface RadioOptionState extends FormControl.FormControlState { }

export interface RadioOptionProps extends FormControl.FormControlProps {
    name: string;
    value: any;
}

export class RadioOption extends React.Component<RadioOptionProps, RadioOptionState> {
    constructor(props: RadioOptionProps) {
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
        return <></>;
    }
}
