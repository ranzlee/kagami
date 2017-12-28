import * as React from "react";
import * as ReactDOM from "react-dom";
import { stylePaddingLeft40px } from "./Styles";

export interface CreateAccountState {
  email: string;
  password: string;
  confirmPassword: string;
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
    this.state = { email: "", password: "", confirmPassword: "" };
  }

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = (event: any) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleLoginLocalAccount = (event: any) => {
    //alert("A name was submitted: " + this.state.name);
    event.preventDefault();
    this.props.showLoginLocalAccount();
  };

  handleCreateAccount = (event: any) => {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-9">
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Create
                a new local account or&nbsp;<a
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
              <div className="col-lg-3" />
              <div className="col-lg-2">
                <label style={stylePaddingLeft40px} htmlFor="confirmPassword">
                  Confirm Password
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  className="form-control"
                  id="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Re-enter your password"
                  onChange={this.handleConfirmPasswordChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-lg-2">
              <button
                className="btn btn-primary"
                onClick={this.handleCreateAccount}
              >
                Create my account!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
