import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
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
      <Grid fluid={false}>
        <hr />
        <Row>
          <Col lg={3} />
          <Col lg={9}>
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Login
                using one of your existing social media accounts.
              </span>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={3} />
          <Col lg={3}>
            <a
              className="btn btn-block btn-social btn-facebook"
              href="/auth/facebook"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
              Sign in with Facebook
            </a>
          </Col>
          <Col lg={3}>
            <a
              className="btn btn-block btn-social btn-google"
              href="/auth/google"
            >
              <i className="fa fa-google" aria-hidden="true" />
              Sign in with Google
            </a>
          </Col>
        </Row>
        {this.state.context}
      </Grid>
    );
  }
}
