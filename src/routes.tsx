import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import About from "./components/About";

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={App} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}
