import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";
import { Form } from "../common/form-elements/Form";
import { AnchorLink } from "../common/widgets/AnchorLink";
import { Textbox } from "../common/form-elements/Textbox";

export interface ForgotPasswordState {
  email: string;
  formWasValidated: string;
}

export interface ForgotPasswordProps {
  showLoginLocalAccount: any;
}

export class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = { email: "", formWasValidated: "" };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handleLoginLocalAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showLoginLocalAccount();
  };

  handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {};

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span className="text-muted">
                Enter your email address to reset your local account or&nbsp;
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
        <Form onSubmit={this.handleForgotPassword}>
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
          <div className="row">
            <div className="col-4" />
            <div className="col-8 text-right">
              <Button
                buttonType="submit"
                buttonClassName="warning"
                buttonText="Reset my account password!"
                buttonFaIconName="fa-recycle"
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
