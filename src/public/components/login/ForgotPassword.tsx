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
import { styleUnderlineBold, stylePaddingLeft50px } from "./Styles";

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
        <br />
        <hr />
        <Row>
          <Col lg={3} />
          <Col lg={9}>
            <div className="text-primary">
              <span>
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Enter
                your email address to reset your local account or&nbsp;<a
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
          <Row>
            <Col lg={5} />
            <Col lg={2}>
              <Button
                bsClass="btn btn-primary"
                onClick={this.handleForgotPassword}
              >
                Reset my account password!
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
