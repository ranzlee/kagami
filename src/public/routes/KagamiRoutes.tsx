import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "./../components/App";
import Home from "./../components/Home";
import About from "./../components/About";
import Login from "./../components/login/Login";
import ConfigurationRoutes from "./ConfigurationRoutes";
import * as UserService from "./../services/userService";

export default class KagamiRoutes extends React.Component {
  logout = (event: any) => {
    event.preventDefault();
    UserService.logout();
  };

  render() {
    let authLink = null;
    if (UserService.getUser() != null) {
      authLink = (
        <a href="" className="nav-item nav-link" onClick={this.logout}>
          LOGOUT
        </a>
      );
    } else {
      authLink = (
        <Link className="nav-item nav-link" to="/login">
          LOGIN
        </Link>
      );
    }

    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            KAGAMI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/home">
                HOME
              </Link>
              <Link className="nav-item nav-link" to="/configuration">
                CONFIGURATION
              </Link>
              <Link className="nav-item nav-link" to="/about">
                ABOUT
              </Link>
            </div>
            <div className="navbar-nav ml-auto">{authLink}</div>
          </div>
        </nav>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route path="/configuration" component={ConfigurationRoutes} />
      </div>
    );
  }
}
