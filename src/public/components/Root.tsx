import * as React from "react";
import { Router } from "react-router";
import { createHashHistory } from "history";
import KagamiRoutes from "./../routes/KagamiRoutes";

const history = createHashHistory();

export default class Root extends React.Component {
  render() {
    return (
      <Router history={history}>
        <KagamiRoutes children={this.props.children} />
      </Router>
    );
  }
}
