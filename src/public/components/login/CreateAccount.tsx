import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";
import { Form } from "../common/form-elements/Form";
import { AnchorLink } from "../common/widgets/AnchorLink";

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
    this.setState({ password: event.currentTarget.value });
  };

  handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.currentTarget.value;
    this.setState({ confirmPassword: val });
    if (this.state.password !== val) {
      event.currentTarget.setCustomValidity("error");
    } else {
      event.currentTarget.setCustomValidity("");
    }
  };

  handleLoginLocalAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showLoginLocalAccount();
  };

  handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {};

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
          <div className="row form-group">
            <label className="col-lg-4 col-form-label" htmlFor="password">
              Password
            </label>
            <div className="col-lg-8">
              <input
                className="form-control"
                id="password"
                type="password"
                value={this.state.password}
                placeholder="Enter your password"
                onChange={this.handlePasswordChange}
                required
                minLength={8}
              />
              <div className="invalid-feedback">
                Password is required and must have at least 8 characters.
              </div>
            </div>
          </div>
          <div className="row form-group">
            <label
              className="col-lg-4 col-form-label"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="col-lg-8">
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                placeholder="Re-enter your password"
                onChange={this.handleConfirmPasswordChange}
                required
              />
              <div className="invalid-feedback">
                Confirm Password is required and must match Password.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-8 text-right">
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
