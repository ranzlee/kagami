import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface TextboxState extends FormControl.FormControlState {}

export interface TextboxProps extends FormControl.FormControlProps {
  type: "email" | "password" | "search" | "tel" | "text" | "url";
  pattern?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  value: string;
  placeholder: string;
}

export class Textbox extends React.Component<TextboxProps, TextboxState> {
  constructor(props: TextboxProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  //*** every wrapped component needs this!
  instance: HTMLInputElement;
  //*** end

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onChangeCustomValidation) {
      FormControl.OnChangeCustomValidation(this, event.currentTarget);
    }
  };

  //*** every wrapped component needs this!
  componentDidMount() {
    if (this.props.validateOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    this.props.form.registerFormCustomValidations(this, this.instance);
  }
  //*** end

  render() {
    let required = this.props.required ? true : false;
    let pattern = this.props.pattern ? this.props.pattern : null;
    let maxLength = this.props.maxLength ? this.props.maxLength : null;
    let minLength = this.props.minLength ? this.props.minLength : null;
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              //*** every wrapped component needs this!
              this.instance = instance;
            }} //*** end
            className="form-control"
            id={this.props.id}
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            required={required}
            pattern={pattern}
            maxLength={maxLength}
            minLength={minLength}
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
        {extendedProps.children}
      </div>
    );
  }
}
