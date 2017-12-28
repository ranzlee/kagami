import * as React from "react";
import * as ReactDOM from "react-dom";
import { styleLocalLoginLabelsPaddingLeft } from "./Styles";

export interface ForgotPasswordState {
  email: string;
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
    this.state = { email: "" };
  }

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handleLoginLocalAccount = (event: any) => {
    //alert("A name was submitted: " + this.state.name);
    event.preventDefault();
    this.props.showLoginLocalAccount();
  };

  handleForgotPassword = (event: any) => {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-9">
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Enter
                your email address to reset your local account or&nbsp;<a
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
                <label style={styleLocalLoginLabelsPaddingLeft} htmlFor="email">
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
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-lg-2">
              <button
                className="btn btn-primary"
                onClick={this.handleForgotPassword}
              >
                Reset my account password!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
