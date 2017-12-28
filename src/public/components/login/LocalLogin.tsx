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
import { styleUnderlineBold, stylePaddingTop7px, stylePaddingLeft50px } from "./Styles";

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
        <br />
        <hr />
        <Row>
          <Col lg={3} />
          <Col lg={9}>
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Login
                using your local account or&nbsp;
                <a
                  href=""
                  style={styleUnderlineBold}
                  className="text-info"
                  onClick={this.handleCreateAccount}
                >
                  create a new local account
                </a>&nbsp;to get started!
              </span>
            </div>
          </Col>
        </Row>
        <br />
        <form className="form-horizontal">
          <FormGroup>
            <Row>
              <Col lg={3} />
              <Col lg={2}>
                <ControlLabel style={stylePaddingLeft50px} htmlFor="email">Email Address</ControlLabel>
              </Col>
              <Col lg={4}>
                <FormControl
                  id="email"
                  type="text"
                  value={this.state.email}
                  placeholder="Enter your email address"
                  onChange={this.handleEmailChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={3} />
              <Col lg={2} >
                <ControlLabel style={stylePaddingLeft50px} htmlFor="password">Password</ControlLabel>
              </Col>
              <Col lg={4}>
                <FormControl
                  id="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handlePasswordChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={5} />
              <Col lg={2}>
                <Checkbox title="Remember me">Remember me</Checkbox>
              </Col>
              <Col lg={2} style={stylePaddingTop7px}>
                <a href="" onClick={this.handleForgotPassword}>
                  Forgot your password?
                </a>
              </Col>
            </Row>
          </FormGroup>
          <Row>
            <Col lg={5} />
            <Col lg={2}>
              <Button bsClass="btn btn-primary" onClick={this.handleLogin}>
                Log me in!
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
