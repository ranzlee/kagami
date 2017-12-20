import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import  Root from "./Root";
import "./../assets/css/main.scss";
import "./../assets/styles.css";
import "./../assets/js/lib/bootstrap.min.js";
import { Provider } from "react-redux";
import { Store } from "./../Store";
import KagamiRoutes from "./../routes/KagamiRoutes";

declare const module: any;

const renderApp = (appRoutes: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={Store}>
        <Root children={appRoutes} />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(KagamiRoutes);

if (module.hot) {
  module.hot.accept(KagamiRoutes, () => {
    renderApp(require("./../routes/KagamiRoutes").default);
  });
}
