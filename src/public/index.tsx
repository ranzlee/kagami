import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./root";
import routes from "./routes";
import "./assets/css/main.scss";
import "./assets/styles.css";
import "./assets/js/lib/bootstrap.min.js";

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
