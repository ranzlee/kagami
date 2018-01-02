import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";

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
    event.preventDefault();
    this.props.showLoginLocalAccount();
  };

  handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ formWasValidated: "was-validated" });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span className="text-muted">
                Enter your email address to reset your local account or&nbsp;<a
                  href=""
                  onClick={this.handleLoginLocalAccount}
                >
                  login with an existing local account
                </a>&nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <form
          noValidate
          onSubmit={this.handleForgotPassword}
          className={this.state.formWasValidated}
        >
          <div className="row form-group">
            <label className="col-lg-4 col-form-label" htmlFor="email">
              Email Address
            </label>
            <div className="col-lg-8">
              <input
                className="form-control"
                id="email"
                type="email"
                value={this.state.email}
                placeholder="Enter your email address"
                onChange={this.handleEmailChange}
                required
              />
              <div className="invalid-feedback">
                Email Address is required and must be a valid email format.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-8 text-right">
              <Button
                buttonType="submit"
                buttonClassName="warning"
                buttonText="Reset my account password!"
                buttonFaIconName="fa-recycle"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
