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
import { styleUnderlineBold } from "./Styles";

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
        <br />
        <hr />
        <Row>
          <Col lg={3} />
          <Col lg={9}>
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Create
                a new local account or&nbsp;<a
                  href=""
                  style={styleUnderlineBold}
                  className="text-info"
                  onClick={this.handleLoginLocalAccount}
                >
                  login with an existing local account
                </a>&nbsp;to get started!
              </span>
            </div>
          </Col>
        </Row>
        <hr />
        <br />
        <form className="form-horizontal">
          <FormGroup>
            <Row>
              <Col lg={3} />
              <Col lg={2} className="text-left">
                <ControlLabel htmlFor="email">Email Address</ControlLabel>
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
              <Col lg={2} className="text-left">
                <ControlLabel htmlFor="password">Password</ControlLabel>
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
              <Col lg={3} />
              <Col lg={2} className="text-left">
                <ControlLabel htmlFor="confirmPassword">
                  Confirm Password
                </ControlLabel>
              </Col>
              <Col lg={4}>
                <FormControl
                  id="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Re-enter your password"
                  onChange={this.handleConfirmPasswordChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <Row>
            <Col lg={5} />
            <Col lg={2}>
              <Button
                bsClass="btn btn-default"
                onClick={this.handleCreateAccount}
              >
                Create my account!
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
