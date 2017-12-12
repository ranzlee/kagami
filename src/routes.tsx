import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import About from "./components/About";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Navbar fluid fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Qwik</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={2}>About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}
