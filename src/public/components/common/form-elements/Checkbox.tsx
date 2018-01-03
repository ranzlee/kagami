import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface CheckboxState { }

export interface CheckboxProps extends FormControl.FormControlProps {
    id: string;
    labelName: string;
    checkBoxTitle: string;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {};
    }

    render() {
        //let checkboxSize = `col-${this.props.checkBoxSize} offset-${this.props.offset}`;
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        return (
            <>
            <div className={extendedProps.labelClasses}>

            </div>
            <div className={extendedProps.formControlClasses}>
                <div className="checkbox">
                    <input id={this.props.id} type="checkbox" title={this.props.checkBoxTitle} />
                    <label htmlFor={this.props.id}>{this.props.labelName}</label>
                </div>
            </div>
            {extendedProps.children}
            </>
        )
    }
}
