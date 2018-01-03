import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";
import { Form } from "../common/form-elements/Form";
import { AnchorLink } from "../common/widgets/AnchorLink";
import { Textbox } from "../common/form-elements/Textbox";
import * as FormControl from "../common/form-elements/FormControl";

export interface CreateAccountState {
  email: string;
  password: string;
  confirmPassword: string;
  formWasValidated: string;
}

export interface CreateAccountProps {
  showLoginLocalAccount: any;
}

export class CreateAccount extends React.Component<
  CreateAccountProps,
  CreateAccountState
> {
  constructor(props: CreateAccountProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      formWasValidated: ""
    };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
      confirmPassword: ""
    });
  };

  handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ confirmPassword: event.currentTarget.value });
  };

  handleConfirmPasswordChangeCustomValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ): FormControl.CustomValidationResult => {
    let isValid = true;
    if (this.state.password !== event.currentTarget.value) {
      isValid = false;
    }
    return {
      isValid: isValid,
      validationMessage: "Confirm Password must match Password"
    };
  };

  handleLoginLocalAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showLoginLocalAccount();
  };

  handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    alert("create account!");
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span className="text-muted">
                Create a new local account or&nbsp;
                <AnchorLink
                  linkText="login with an existing local account"
                  onClick={this.handleLoginLocalAccount}
                />
                &nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <Form onSubmit={this.handleCreateAccount}>
          <Textbox
            inputId="email"
            inputType="email"
            label="Email Address"
            value={this.state.email}
            placeholder="Enter your email address"
            isRequired={true}
            onChange={this.handleEmailChange}
            invalidFeedback="Email Address is required and must be a valid email format."
            controlCol={8}
            labelCol={4}
          />
          <Textbox
            inputId="password"
            inputType="password"
            label="Password"
            value={this.state.password}
            placeholder="Enter your password"
            isRequired={true}
            minLength={8}
            onChange={this.handlePasswordChange}
            invalidFeedback="Password is required and must have at least 8 characters."
            controlCol={8}
            labelCol={4}
          />
          <Textbox
            inputId="confirmPassword"
            inputType="password"
            label="Confirm Password"
            value={this.state.confirmPassword}
            placeholder="Re-enter your password"
            isRequired={true}
            onChange={this.handleConfirmPasswordChange}
            onChangeCustomValidation={
              this.handleConfirmPasswordChangeCustomValidation
            }
            invalidFeedback="Confirm Password is required."
            controlCol={8}
            labelCol={4}
          />
          <div className="row">
            <div className="col-4" />
            <div className="col-8 text-right">
              <Button
                buttonType="submit"
                buttonClassName="primary"
                buttonText="Create my account!"
                buttonFaIconName="fa-check"
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
