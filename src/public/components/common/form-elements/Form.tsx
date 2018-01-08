import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Numberbox } from "./Numberbox";
import { Radio } from "./Radio";
import { TextArea } from "./TextArea";
import { Textbox } from "./Textbox";
import { Toggle } from "./Toggle";

export interface FormState {
  formWasValidated: string;
}

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validateOnMount?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
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

  recursiveMap(children: any, fn: any, thisComponent: Form): any {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if ((child as any).props.children) {
        child = React.cloneElement(child as any, {
          children: this.recursiveMap(
            (child as any).props.children,
            fn,
            thisComponent
          )
        });
      }
      return fn(child, thisComponent);
    });
  }

  isWrappedComponent(child: any): boolean {
    if (
      child.type === Button ||
      child.type === Checkbox ||
      child.type === Numberbox ||
      child.type === Radio ||
      child.type === TextArea ||
      child.type === Textbox ||
      child.type === Toggle
    ) {
      return true;
    }
    return false;
  }

  mapChild(child: React.ReactNode, thisComponent: Form) {
    if (thisComponent.isWrappedComponent(child as any)) {
      if ((child as any).props.doCustomValidationOnMount == null) {
        return React.cloneElement(child as any, {
          doCustomValidationOnMount: thisComponent.props.validateOnMount,
          form: thisComponent
        });
      } else {
        return React.cloneElement(child as any, { form: thisComponent });
      }
    } else {
      return child;
    }
  }

  // renderChildren(children: React.ReactNode) {
  //   return React.Children.map(children, child => {
  //     if ((child as any).props.onChangeCustomValidation) {
  //       if ((child as any).props.doCustomValidationOnMount == null) {
  //         return React.cloneElement(child as any, {
  //           doCustomValidationOnMount: self.props.validateOnMount,
  //           form: this
  //         });
  //       } else {
  //         return React.cloneElement(child as any, { form: this });
  //       }
  //     } else {
  //       return child;
  //     }
  //   });
  // }

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
        {this.recursiveMap(this.props.children, this.mapChild, this)}
      </form>
    );
  }
}
