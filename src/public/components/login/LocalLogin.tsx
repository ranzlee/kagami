import * as React from "react";
import * as ReactDOM from "react-dom";
import { stylePaddingLeft40px } from "./Styles";

export interface LocalLoginState {
  email: string;
  password: string;
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
    this.state = { email: "", password: "" };
  }

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = (event: any) => {};

  handleCreateAccount = (event: any) => {
    event.preventDefault();
    this.props.showCreateAccount();
  };

  handleForgotPassword = (event: any) => {
    event.preventDefault();
    this.props.showForgotPassword();
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-9">
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Login
                using your local account or&nbsp;
                <a href="" onClick={this.handleCreateAccount}>
                  create a new local account
                </a>&nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <form className="form-horizontal">
          <div className="form-group">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-2">
                <label style={stylePaddingLeft40px} htmlFor="email">
                  Email Address
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  className="form-control"
                  id="email"
                  type="text"
                  value={this.state.email}
                  placeholder="Enter your email address"
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-2">
                <label style={stylePaddingLeft40px} htmlFor="password">
                  Password
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-5" />
              <div className="col-lg-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="formControl"
                  title="Remember me"
                />&nbsp;<label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="col-lg-2">
                <a href="" onClick={this.handleForgotPassword}>
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-lg-2">
              <button className="btn btn-primary" onClick={this.handleLogin}>
                Log me in!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
