import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface SelectState extends FormControl.FormControlState {}

export interface SelectProps extends FormControl.FormControlProps {
  value: string | Array<string>;
  required?: boolean;
  placeholderOption?: string;
  size?: number;
  multiple?: boolean;
}

export class Select extends React.Component<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);
    this.state = { invalidFeedback: this.props.invalidFeedback };
  }

  instance: HTMLSelectElement;

  onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (this.props.readOnly != null && this.props.readOnly) {
      return;
    } else {
      if (
        this.props.form != null &&
        this.props.form.props.readOnly != null &&
        this.props.form.props.readOnly
      ) {
        return;
      }
    }
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
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let required = this.props.required ? true : false;
    let multiple = this.props.multiple ? true : false;
    let size = this.props.multiple && this.props.size ? this.props.size : null;
    let placeholderOption =
      !this.props.multiple &&
      this.props.placeholderOption != null &&
      this.props.placeholderOption !== "" ? (
        <option value="">{this.props.placeholderOption}</option>
      ) : null;
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <select
            ref={instance => {
              this.instance = instance;
            }}
            className="form-control"
            id={
              this.props.id //*** end
            }
            name={this.props.name}
            value={this.props.value}
            disabled={
              this.props.disabled != null
                ? this.props.disabled
                : this.props.form && this.props.form.props.disabled != null
                  ? this.props.form.props.disabled
                  : false
            }
            onChange={this.onChange}
            required={required}
            multiple={multiple}
            size={size}
          >
            {placeholderOption}
            {this.props.children}
          </select>
          <div className="invalid-feedback">
            {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
          </div>
        </div>
      </div>
    );
  }
}
