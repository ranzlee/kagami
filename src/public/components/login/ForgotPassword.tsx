import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ForgotPasswordState {
  email: string;
  formWasValidated: string;
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
    this.state = { email: "", formWasValidated: "" };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handleLoginLocalAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.showLoginLocalAccount();
  };

  handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ formWasValidated: "was-validated" });
  };

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
        <form
          noValidate
          onSubmit={this.handleForgotPassword}
          className={this.state.formWasValidated}
        >
          <div className="row form-group">
            <div className="col-lg-3" />
            <label className="col-lg-2 col-form-label" htmlFor="email">
              Email Address
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                id="email"
                type="email"
                value={this.state.email}
                placeholder="Enter your email address"
                onChange={this.handleEmailChange}
                required
              />
              <div className="invalid-feedback">
                Email Address is required and must be a valid email format.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-lg-2">
              <button className="btn btn-primary" type="submit">
                Reset my account password!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
