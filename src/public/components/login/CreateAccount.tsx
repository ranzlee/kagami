import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CreateAccountState {
  email: string;
  password: string;
  confirmPassword: string;
  formWasValidated: string;
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
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      formWasValidated: ""
    };
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ confirmPassword: event.currentTarget.value });
  };

  handleLoginLocalAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.showLoginLocalAccount();
  };

  handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
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
                <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Create
                a new local account or&nbsp;<a
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
          onSubmit={this.handleCreateAccount}
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
          <div className="row form-group">
            <div className="col-lg-3" />
            <label className="col-lg-2 col-form-label" htmlFor="password">
              Password
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                id="password"
                type="password"
                value={this.state.password}
                placeholder="Enter your password"
                onChange={this.handlePasswordChange}
                required
              />
              <div className="invalid-feedback">Password is required.</div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-lg-3" />
            <label
              className="col-lg-2 col-form-label"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                placeholder="Re-enter your password"
                onChange={this.handleConfirmPasswordChange}
                required
              />
              <div className="invalid-feedback">
                Confirm Password is required and must match Password.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-lg-2">
              <button className="btn btn-primary" type="Submit">
                Create my account!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
