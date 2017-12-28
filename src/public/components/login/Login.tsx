import * as React from "react";
import * as ReactDOM from "react-dom";
import { LocalLogin } from "./LocalLogin";
import { CreateAccount } from "./CreateAccount";
import { ForgotPassword } from "./ForgotPassword";

export interface LoginState {
  context: any;
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
      )
    };
  }

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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="alert alert-secondary" role="alert">
              <h4 className="alert-heading">Login to get started!</h4>
              <p>
                Kagami accounts are automatically linked by email address, so
                feel free to use a social media account you already have or
                create a new local account with us. As long as you use the same
                email address across accounts, we'll know who you are.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-9">
            <div className="text-primary">
              <span>
                <i className="fas fa-user" aria-hidden="true" />&nbsp;&nbsp;Login
                using one of your existing social media accounts.
              </span>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-3">
            <a
              className="btn btn-block btn-social btn-facebook"
              href="/auth/facebook"
            >
              <i className="fab fa-facebook-f" aria-hidden="true" />
              Login with Facebook
            </a>
          </div>
          <div className="col-lg-3">
            <a
              className="btn btn-block btn-social btn-google"
              href="/auth/google"
            >
              <i className="fab fa-google" aria-hidden="true" />
              Login with Google
            </a>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="row">
          <div className="col">
            <div className="text-center">
              <span className="text-secondary">OR</span>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        {this.state.context}
      </div>
    );
  }
}
