import * as React from "react";
import * as ReactDOM from "react-dom";

export interface FormState {
  formWasValidated: string;
}

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { formWasValidated: "" };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let form = event.currentTarget;
    this.setState({ formWasValidated: "was-validated" });
    if (form.checkValidity() !== false) {
      this.props.onSubmit(event);
    }
  };

  render() {
    return (
      <form
        noValidate
        onSubmit={this.onSubmit}
        className={this.state.formWasValidated}
      >
        {this.props.children}
      </form>
    );
  }
}
