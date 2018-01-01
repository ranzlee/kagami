import * as React from "react";
import * as ReactDOM from "react-dom";
import { LocalLogin } from "./LocalLogin";
import { CreateAccount } from "./CreateAccount";
import { ForgotPassword } from "./ForgotPassword";
import { FadeAlert } from "../common/widgets/FadeAlert";
import { Card } from "../common/containers/Card";

export interface LoginState {
  content: JSX.Element;
  help: JSX.Element;
}

export interface LoginProps {}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      content: (
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
        <div className="col">
          <button
            onClick={this.showHelp}
            className="btn btn-primary btn-icon btn-icon-mini btn-round"
            aria-label="help and information"
          >
            <i className="fa fa-question" />
          </button>
        </div>
      </div>
    );
  };

  showCreateAccount = () => {
    this.setState({
      content: (
        <CreateAccount showLoginLocalAccount={this.showLoginLocalAccount} />
      )
    });
  };

  showForgotPassword = () => {
    this.setState({
      content: (
        <ForgotPassword showLoginLocalAccount={this.showLoginLocalAccount} />
      )
    });
  };

  showLoginLocalAccount = () => {
    this.setState({
      content: (
        <LocalLogin
          showCreateAccount={this.showCreateAccount}
          showForgotPassword={this.showForgotPassword}
        />
      )
    });
  };

  showHelp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let alertText =
      "Kagami accounts are automatically linked by email address, so feel " +
      "free to use a social media account you already have or create a new " +
      "local account with us. As long as you use the same email address " +
      "across accounts, we'll know who you are.";
    let helpAlert = (
      <FadeAlert
        onClose={this.showHelpLink}
        alertClassName="primary"
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
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-6">
            <div className="row">
              <div className="col">
                <Card
                  titleText="Login using one of your existing social media accounts."
                  toolTip="Login using one of your social media accounts. Kagami will automatically link accounts that use the same email address."
                  titleFaIconName="fa-lock"
                >
                  <div>
                    <div className="row">
                      <div className="col-lg-6">
                        <a
                          className="btn btn-block btn-social btn-facebook"
                          href="/auth/facebook"
                        >
                          <i className="fab fa-facebook-f" aria-hidden="true" />Login
                          with Facebook
                        </a>
                      </div>
                      <div className="col-lg-6">
                        <a
                          className="btn btn-block btn-social btn-google"
                          href="/auth/google"
                        >
                          <i className="fab fa-google" aria-hidden="true" />Login
                          with Google
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="text-center">
                  <span className="text-secondary h5">OR</span>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <Card
                  titleText="Login using your Kagami account."
                  toolTip="Login with your local Kagami account or create a new account."
                  titleFaIconName="fa-lock"
                >
                  {this.state.content}
                </Card>
              </div>
            </div>
          </div>
          <div className="col-lg-3">{this.state.help}</div>
        </div>
      </div>
    );
  }
}
