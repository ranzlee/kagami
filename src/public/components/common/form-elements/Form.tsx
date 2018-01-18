import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import { DateTimePicker } from "./DateTimePicker";
import { Modal } from "../containers/Modal";
import * as Moment from "moment";

export interface FormState {
  formWasValidated: string;
}

export interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  closeModalOnSubmit?: boolean;
  modal?: Modal;
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
  callback?: (validationResult: FormControl.CustomValidationResult) => void;
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
        var validationResult: FormControl.CustomValidationResult;
        if (r.component instanceof DateTimePicker) {
          let comp = r.component as DateTimePicker;
          let moment = Moment(r.element.value, comp.getMomentFormat());
          validationResult = FormControl.OnChangeCustomValidation(
            comp,
            r.element,
            moment
          );
        } else {
          validationResult = FormControl.OnChangeCustomValidation(
            r.component,
            r.element
          );
        }
        if (r.callback) {
          r.callback(validationResult);
        }
        if (!validationResult.isValid) {
          isValid = false;
        }
      });
      if (isValid === true) {
        if (this.props.onSubmit) {
          this.props.onSubmit(event);
          if (this.props.closeModalOnSubmit) {
            if (this.props.modal) {
              this.props.modal.hideModal();
            }
          }
        }
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
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    callback?: (validationResult: FormControl.CustomValidationResult) => void
  ) {
    this.formCustomValidationRegistry.push({
      component: component,
      element: element,
      callback: callback
    });
  }

  recursiveMap(
    children: React.ReactNode,
    fn: (child: React.ReactNode, thisComponent: Form) => React.ReactNode,
    thisComponent: Form
  ): React.ReactNode {
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

  mapChild(child: React.ReactNode, thisComponent: Form): React.ReactNode {
    if (
      !(child as any).type ||
      !(child as any).type.prototype ||
      !((child as any).type.prototype instanceof React.Component)
    ) {
      return child;
    }
    if (
      !(child as any).props ||
      !(child as any).props.doCustomValidationOnMount
    ) {
      return React.cloneElement(child as any, {
        doCustomValidationOnMount: thisComponent.props.validateOnMount,
        form: thisComponent
      });
    } else {
      return React.cloneElement(child as any, { form: thisComponent });
    }
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
        {this.recursiveMap(this.props.children, this.mapChild, this)}
      </form>
    );
  }
}
