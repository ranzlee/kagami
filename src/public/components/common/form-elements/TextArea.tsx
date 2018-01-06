import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface TextAreaState extends FormControl.FormControlState {}

export interface TextAreaProps extends FormControl.FormControlProps {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  value: string;
  placeholder: string;
  rows: number;
}

export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  //*** every wrapped component needs this!
  instance: HTMLTextAreaElement;
  //*** end

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    let maxLength = this.props.maxLength ? this.props.maxLength : null;
    let minLength = this.props.minLength ? this.props.minLength : null;
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <textarea
            ref={instance => {
              //*** every wrapped component needs this!
              this.instance = instance;
            }}
            className="form-control"
            id={
              this.props.id //*** end
            }
            name={this.props.name}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            onChange={this.onChange}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            rows={this.props.rows}
            value={this.props.value}
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
