import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../common/form-elements/Button";
import { Checkbox } from "../common/form-elements/Checkbox";
import { Form } from "../common/form-elements/Form";
import { Textbox } from "../common/form-elements/Textbox";
import { AnchorLink } from "../common/widgets/AnchorLink";

export interface LocalLoginState {
  email: string;
  password: string;
  formWasValidated: string;
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
    this.state = { email: "", password: "", formWasValidated: "" };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {};

  handleCreateAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showCreateAccount();
  };

  handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.props.showForgotPassword();
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="text-primary">
              <span className="text-muted">
                Login using your local account or&nbsp;
                <AnchorLink
                  linkText="create a new local account"
                  onClick={this.handleCreateAccount}
                />
                &nbsp;to get started!
              </span>
            </div>
          </div>
        </div>
        <br />
        <Form onSubmit={this.handleLogin}>
          <Textbox
            id="email"
            type="email"
            label="Email Address"
            value={this.state.email}
            placeholder="Enter your email address"
            required={true}
            onChange={this.handleEmailChange}
            invalidFeedback="Email Address is required and must be a valid email format."
            controlCol={8}
            labelCol={4}
          />
          <Textbox
            id="password"
            type="password"
            label="Password"
            value={this.state.password}
            placeholder="Enter your password"
            required={true}
            onChange={this.handlePasswordChange}
            invalidFeedback="Password is required"
            controlCol={8}
            labelCol={4}
          />
          <Checkbox
            id="rememberMe"
            label="Remember me"
            controlCol={4}
            labelCol={4}
            checked={false}
          />
          <div className="row">
            <div className="col-6">
              <AnchorLink
                linkText="Forgot your password?"
                onClick={this.handleForgotPassword}
              />
            </div>
            <div className="col-6 text-right">
              <Button
                type="submit"
                className="primary"
                buttonText="Log me in!"
                iconName="fa-unlock"
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
