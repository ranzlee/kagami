import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CheckboxState { }

export interface CheckboxProps {
    id: string;
    offset: string;
    checkBoxSize: string;
    labelName: string;
    checkBoxTitle: string;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {};
    }

    render() {
        let checkboxSize = `col-${this.props.checkBoxSize} offset-${this.props.offset}`;

        return (
            <div className={checkboxSize}>
                <div className="checkbox">
                    <input id={this.props.id} type="checkbox" title={this.props.checkBoxTitle} />
                    <label htmlFor={this.props.id}>{this.props.labelName}</label>
                </div>
            </div>
        )
    }
}
