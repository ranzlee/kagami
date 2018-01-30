import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { RadioOption } from "./RadioOption";

export interface RadioState extends FormControl.FormControlState {
  value: string;
}

export interface RadioProps extends FormControl.FormControlProps {
  value: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomValidation?: (
    element: HTMLInputElement
  ) => FormControl.CustomValidationResult;
}

export class Radio extends React.Component<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);
    this.state = {
      invalidFeedback: this.props.invalidFeedback,
      value: this.props.value
    };
    this.radioOptions = [];
  }

  instance: HTMLInputElement;

  radioOptions: Array<HTMLInputElement>;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    //clear custom validation error on change
    this.radioOptions.forEach(radioOption => {
      radioOption.setCustomValidity("");
    });
    let val = event.currentTarget.value;
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    //set the hidden input to the selected radio option value
    this.setState({ value: val }, () => {
      if (this.props.onChangeCustomValidation) {
        this.setRadioOptionsValidState(
          FormControl.OnChangeCustomValidation(this, this.instance)
        );
      }
    });
  };

  registerRadioOption(element: HTMLInputElement) {
    this.radioOptions.push(element);
  }

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      if (this.radioOptions && this.radioOptions.length > 0) {
        //only check custom validation and set all options invalid if the constraint validation passes.
        //constraint validation is only checked on a single radio option with the same name
        if (this.radioOptions[0].validity.valid) {
          this.setRadioOptionsValidState(
            FormControl.OnChangeCustomValidation(this, this.instance)
          );
        }
      }
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(
        this,
        this.instance,
        (validationResult: FormControl.CustomValidationResult) => {
          this.setRadioOptionsValidState(validationResult);
        }
      );
    }
  }

  setRadioOptionsValidState(
    validationResult: FormControl.CustomValidationResult
  ) {
    if (!validationResult.isValid) {
      this.radioOptions.forEach(radioOption => {
        //set all radio options invalid if constraint validation passes and custom validation fails
        if (radioOption.validity.valid) {
          radioOption.setCustomValidity("*");
        }
      });
    }
  }

  renderChildren() {
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    let countOfRadioOptions = React.Children.count(this.props.children);
    var count = 0;
    return React.Children.map(this.props.children, child => {
      if ((child as any).type === RadioOption) {
        count++;
        return React.cloneElement(child as any, {
          isFirst: count === 1,
          isLast: count === countOfRadioOptions,
          radio: this
        });
      } else return child;
    });
  }

  render() {
    return (
      <div className="form-group">
        {this.renderChildren()}
        <input
          ref={instance => {
            this.instance = instance;
          }}
          type="hidden"
          value={this.state.value}
        />
      </div>
    );
  }
}
