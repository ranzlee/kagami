import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";
import { Form } from "../common/form-elements/Form";
import { AnchorLink } from "../common/widgets/AnchorLink";

export interface LocalLoginState {
  email: string;
  password: string;
  formWasValidated: string;
}

export interface LocalLoginProps {
  showCreateAccount: any;
  showForgotPassword: any;
}

export class LocalLogin extends React.Component<
  LocalLoginProps,
  LocalLoginState
> {
  constructor(props: LocalLoginProps) {
    super(props);
    this.state = { email: "", password: "", formWasValidated: "" };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {};

  handleCreateAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showCreateAccount();
  };

  handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showForgotPassword();
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span className="text-muted">
                Login using your local account or&nbsp;
                <AnchorLink
                  linkText="create a new local account"
                  onClick={this.handleCreateAccount}
                />
                &nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <Form onSubmit={this.handleLogin}>
          <div className="row form-group">
            <label className="col-lg-4 col-form-label" htmlFor="email">
              Email Address
            </label>
            <div className="col-lg-8">
              <input
                className="form-control"
                id="email"
                required
                type="email"
                value={this.state.email}
                placeholder="Enter your email address"
                onChange={this.handleEmailChange}
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
                required
                type="password"
                value={this.state.password}
                placeholder="Enter your password"
                onChange={this.handlePasswordChange}
              />
              <div className="invalid-feedback">Password is required.</div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-lg-4" />
            <div className="col-lg-4">
              <div className="checkbox">
                <input id="rememberMe" type="checkbox" title="Remember me" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>
            <div className="col-lg-4">
              <AnchorLink
                linkText="Forgot your password?"
                onClick={this.handleForgotPassword}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-8 text-right">
              <Button
                buttonType="submit"
                buttonClassName="primary"
                buttonText="Log me in!"
                buttonFaIconName="fa-unlock"
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
