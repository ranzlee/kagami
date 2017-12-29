import * as React from "react";
import * as ReactDOM from "react-dom";

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

  handleLogin = (event: any) => {
    let form = document.getElementById("localLogin") as any;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };

  handleCreateAccount = (event: any) => {
    event.preventDefault();
    this.props.showCreateAccount();
  };

  handleForgotPassword = (event: any) => {
    event.preventDefault();
    this.props.showForgotPassword();
  };
  render() {
    return <div>
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-lg-9">
          <div className="text-primary">
            <span>
              <i className="fa fa-user" aria-hidden="true" />&nbsp;&nbsp;Login using your local account or&nbsp;
                <a href="" onClick={this.handleCreateAccount}>
                create a new local account
                </a>&nbsp;to get started!
              </span>
          </div>
        </div>
      </div>
      <br />
      <form id="localLogin">
        <div className="row form-group">
          <div className="col-lg-3" />
          <label className="col-lg-2 col-form-label" htmlFor="email">
            Email Address
                </label>
          <div className="col-lg-4">
            <input className="form-control" id="email" required type="text" value={this.state.email} placeholder="Enter your email address" onChange={this.handleEmailChange} />
            <div className="invalid-feedback">
              Email Address is required.
                </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-lg-3" />
          <label className="col-lg-2 col-form-label" htmlFor="password">
            Password
                </label>
          <div className="col-lg-4">
            <input className="form-control" id="password" required type="password" value={this.state.password} placeholder="Enter your password" onChange={this.handlePasswordChange} />
            <div className="invalid-feedback">
              Password is required.
                </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-lg-5" />
          <div className="col-lg-2">
            <div className="form-check">
              <input id="rememberMe" type="checkbox" className="form-check-input" title="Remember me" /><label className="form-check-label" htmlFor="rememberMe">
                Remember me
                </label>
            </div>
          </div>
          <div className="col-lg-2">
            <a href="" onClick={this.handleForgotPassword}>
              Forgot your password?
                </a>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5" />
          <div className="col-lg-2">
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Log me in!
              </button>
          </div>
        </div>
      </form>
    </div>;
  }
}
