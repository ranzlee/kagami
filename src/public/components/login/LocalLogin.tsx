import * as React from "react";
import * as ReactDOM from "react-dom";
import { SyntheticEvent } from "react";

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

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ formWasValidated: "was-validated" });
  };

  handleCreateAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.showCreateAccount();
  };

  handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.showForgotPassword();
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span>
                Login using your local account or&nbsp;
                <a href="" onClick={this.handleCreateAccount}>
                  create a new local account
                </a>&nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <form
          noValidate
          onSubmit={this.handleLogin}
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
              <div className="form-check">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="form-check-input"
                  title="Remember me"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <a href="" onClick={this.handleForgotPassword}>
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-8 text-right">
              <button type="submit" className="btn btn-primary">
                Log me in!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
