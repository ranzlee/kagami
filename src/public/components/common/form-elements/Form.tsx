import * as React from "react";
import * as ReactDOM from "react-dom";

export interface FormState {
  formWasValidated: string;
}

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validateOnMount?: boolean;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { formWasValidated: "" };
  }

  instance: HTMLFormElement;

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let form = event.currentTarget;
    this.setState({ formWasValidated: "was-validated" });
    if (form.checkValidity() !== false) {
      this.props.onSubmit(event);
    }
  };

  setFormValidated(form: HTMLFormElement) {
    this.setState({ formWasValidated: "was-validated" });
    form.checkValidity();
  }

  componentDidMount() {
    if (this.props.validateOnMount) {
      this.setFormValidated(this.instance);
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
        {this.props.children}
      </form>
    );
  }
}
