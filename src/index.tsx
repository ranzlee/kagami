import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./root";
import routes from "./routes";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";

declare const module: any;

const renderApp = (appRoutes: any) => {
  ReactDOM.render(
    <AppContainer>
      <Root children={appRoutes} />
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(routes);

if (module.hot) {
  module.hot.accept(routes, () => {
    renderApp(require("./routes").default);
  });
}
