import * as React from "react";
import * as ReactDOM from "react-dom";
import { LocalLogin } from "./LocalLogin";
import { CreateAccount } from "./CreateAccount";
import { ForgotPassword } from "./ForgotPassword";
import { BootstrapFadeAlert } from "../common/BootstrapFadeAlert";

export interface LoginState {
  context: JSX.Element;
  help: JSX.Element;
}

export interface LoginProps {}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      context: (
        <LocalLogin
          showCreateAccount={this.showCreateAccount}
          showForgotPassword={this.showForgotPassword}
        />
      ),
      help: this.helpLink()
    };
  }

  helpLink = (): JSX.Element => {
    return (
      <div className="row">
        <div className="col text-right">
          <a
            href=""
            onClick={this.showHelp}
            className="text-info"
            title="more info"
          >
            Help
          </a>
        </div>
      </div>
    );
  };

  showCreateAccount = () => {
    this.setState({
      context: (
        <CreateAccount showLoginLocalAccount={this.showLoginLocalAccount} />
      )
    });
  };

  showForgotPassword = () => {
    this.setState({
      context: (
        <ForgotPassword showLoginLocalAccount={this.showLoginLocalAccount} />
      )
    });
  };

  showLoginLocalAccount = () => {
    this.setState({
      context: (
        <LocalLogin
          showCreateAccount={this.showCreateAccount}
          showForgotPassword={this.showForgotPassword}
        />
      )
    });
  };

  showHelp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    let alertText =
      "Kagami accounts are automatically linked by email address, so feel " +
      "free to use a social media account you already have or create a new " +
      "local account with us. As long as you use the same email address " +
      "across accounts, we'll know who you are.";
    let helpAlert = (
      <BootstrapFadeAlert
        onClose={this.showHelpLink}
        alertClassName="alert-info"
        alertBody={alertText}
        alertTitle="Login to get started!"
      />
    );
    this.setState({
      help: (
        <div className="row">
          <div className="col">{helpAlert}</div>
        </div>
      )
    });
  };

  showHelpLink = () => {
    this.setState({ help: this.helpLink() });
  };

  render() {
    return (
      <div className="container">
        {this.state.help}
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-light">
                <div className="text-primary h5">
                  <span>
                    <i className="fas fa-lock" aria-hidden="true" />&nbsp;&nbsp;Login
                    using one of your existing social media accounts.
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <a
                      className="btn btn-block btn-social btn-facebook"
                      href="/auth/facebook"
                    >
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                      Login with Facebook
                    </a>
                  </div>
                  <div className="col-lg-6">
                    <a
                      className="btn btn-block btn-social btn-google"
                      href="/auth/google"
                    >
                      <i className="fab fa-google" aria-hidden="true" />
                      Login with Google
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <div className="text-center">
              <span className="text-secondary h4">OR</span>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-light">
                <div className="text-primary h5">
                  <span>
                    <i className="fas fa-lock" aria-hidden="true" />&nbsp;&nbsp;Login
                    using your Kagami account.
                  </span>
                </div>
              </div>
              <div className="card-body">{this.state.context}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
