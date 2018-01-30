import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";

export interface TextAreaState extends FormControl.FormControlState {}

export interface TextAreaProps extends FormControl.FormControlProps {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  value: string;
  placeholder: string;
  rows: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeCustomValidation?: (
    element: HTMLTextAreaElement
  ) => FormControl.CustomValidationResult;
}

export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLTextAreaElement;

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  render() {
    let required = this.props.required ? true : false;
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
          <textarea
            ref={instance => {
              this.instance = instance;
            }}
            className="form-control"
            id={id}
            name={this.props.name}
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
            maxLength={maxLength}
            minLength={minLength}
            rows={this.props.rows}
            value={this.props.value}
          />
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
