import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./Root";
import "./../assets/css/main.scss";
import "./../assets/js/lib/bootstrap.min.js";
import "./../assets/css/themes/now-ui/js/plugins/bootstrap-switch.js";
import { Provider } from "react-redux";
const configureStore: any = require("./../Store");
import KagamiRoutes from "./../routes/KagamiRoutes";
import * as Raven from "raven-js";
import { WebSocketService } from "../services/WebSocketService";

//configure error handling
Raven.config(
  "https://e7941cb10bcd4a26b7d9f1964b11945c@sentry.io/263220"
).install();

; declare const module: any;

const store = configureStore.configureStore();

const renderApp = (appRoutes: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
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

WebSocketService.initialize();
