import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { RadioOption } from "./RadioOption";
import * as linq from "linq";

export interface RadioState extends FormControl.FormControlState { }

export interface RadioProps extends FormControl.FormControlProps {
    value: string;
    required?: boolean;
}

export class Radio extends React.Component<RadioProps, RadioState> {
    constructor(props: RadioProps) {
        super(props);
        this.state = { invalidFeedback: this.props.invalidFeedback };
    }

    instance: HTMLInputElement;

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        if (this.props.onChangeCustomValidation) {
            FormControl.OnChangeCustomValidation(this, event.currentTarget);
        }
    };

    componentDidMount() {
        if (this.props.doCustomValidationOnMount) {
            FormControl.OnChangeCustomValidation(this, this.instance);
        }
        if (this.props.form) {
            this.props.form.registerFormCustomValidations(this, this.instance);
        }
    }

    renderChildren() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        var countOfRadioOptions = linq.from(this.props.children).count(i => (i as any).type === RadioOption);
        var count = 0;
        return React.Children.map(this.props.children, child => {
            if ((child as any).type === RadioOption) {
                count++;
                return React.cloneElement((child as any), {
                    isLast: count === countOfRadioOptions,
                    radio: this
                })
            }
            else
                return child
        })
    }

    render() {
        let extendedProps = FormControl.FormControlExtendedProperties(this.props);
        let required = this.props.required ? true : false;
        return (
            <div className="form-group">
                {this.renderChildren()}
            </div>
        );
    }
}
