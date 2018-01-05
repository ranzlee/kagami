import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";

export interface FormState {
  formWasValidated: string;
}

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validateOnMount?: boolean;
}

export interface FormCustomValidationRegister {
  component: React.Component<
    FormControl.FormControlProps,
    FormControl.FormControlState
  >;
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { formWasValidated: "" };
    this.formCustomValidationRegistry = [];
  }

  instance: HTMLFormElement;
  wasValidatedClassName = "was-validated";
  formCustomValidationRegistry: Array<FormCustomValidationRegister>;

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let form = event.currentTarget;
    this.setState({
      formWasValidated: this.wasValidatedClassName
    });
    if (form.checkValidity() !== false) {
      //todo: if custom validation passes
      let isValid = true;
      this.formCustomValidationRegistry.forEach(r => {
        let validationResult = FormControl.OnChangeCustomValidation(
          r.component,
          r.element
        );
        if (!validationResult.isValid) {
          isValid = false;
        }
      });
      if (isValid === true) {
        this.props.onSubmit(event);
      }
    }
  };

  setFormValidated(form: HTMLFormElement) {
    this.setState({
      formWasValidated: this.wasValidatedClassName
    });
    form.checkValidity();
  }

  componentDidMount() {
    if (this.props.validateOnMount) {
      this.setFormValidated(this.instance);
    }
  }

  registerFormCustomValidations(
    component: React.Component<
      FormControl.FormControlProps,
      FormControl.FormControlState
    >,
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ) {
    this.formCustomValidationRegistry.push({
      component: component,
      element: element
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if ((child as any).props.onChangeCustomValidation) {
        if ((child as any).props.doCustomValidationOnMount == null) {
          return React.cloneElement(child as any, {
            doCustomValidationOnMount: this.props.validateOnMount,
            form: this
          });
        } else {
          return React.cloneElement(child as any, { form: this });
        }
      } else {
        return child;
      }
    });
  }

  render() {
    return (
      <form
        ref={instance => {
          this.instance = instance;
        }}
        noValidate
        onSubmit={this.onSubmit}
        className={this.state.formWasValidated}
      >
        {this.renderChildren()}
      </form>
    );
  }
}
