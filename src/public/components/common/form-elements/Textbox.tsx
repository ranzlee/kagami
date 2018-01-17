import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";

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
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(this, this.instance);
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.instance);
    }
  }
  //*** end

  render() {
    let required = this.props.required ? true : false;
    let pattern = this.props.pattern ? this.props.pattern : null;
    let maxLength = this.props.maxLength ? this.props.maxLength : null;
    let minLength = this.props.minLength ? this.props.minLength : null;
    let id = lodash.uniqueId(this.props.id);
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <input
            ref={instance => {
              //*** every wrapped component needs this!
              this.instance = instance;
            }}
            className="form-control"
            id={
              id //*** end
            }
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled={
              this.props.disabled != null
                ? this.props.disabled
                : this.props.form && this.props.form.props.disabled != null
                  ? this.props.form.props.disabled
                  : false
            }
            readOnly={
              this.props.readOnly != null
                ? this.props.readOnly
                : this.props.form && this.props.form.props.readOnly != null
                  ? this.props.form.props.readOnly
                  : false
            }
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
      </div>
    );
  }
}
