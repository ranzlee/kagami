import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "components/App";
import Home from "components/Home";
import About from "components/About";
import Login from "components/Login";
import { ConfigurationRoutes } from "routes/ConfigurationRoutes"; 
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Navbar fluid fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">KAGAMI</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <NavItem eventKey={2}>HOME</NavItem>
              </LinkContainer>
              <LinkContainer to="/configuration">
                <NavItem eventKey={2}>CONFIGURATION</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={3}>ABOUT</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/login">
                <NavItem eventKey={1}>LOGIN</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/configuration" component={ConfigurationRoutes} />
      </div>
    );
  }
}