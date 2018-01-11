import {
    applyMiddleware,
    createStore,
    compose
} from "redux";
import {
    createLogger
} from 'redux-logger';
import {
    createEpicMiddleware
} from 'redux-observable';
import {
    rootEpic
} from './epics/RootEpic';
import {
    perflogger
} from 'redux-perf-middleware';
import * as Immutable from 'immutable';
import reducer from "./reducers/RootReducer";
import {
    ConfigurationRecord
} from "./../shared/models/configuration/Configuration";
import {
    AppStoreRecord
} from "./types/AppStore";
import KagamiRoutes from "./routes/KagamiRoutes";

const logger = createLogger({
    // .. options
});

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers =
    typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "KAGAMI by Jeremy Conger, Randy Lee, Kevin Mistry and Cody Raffensperger",
            serialize: {
                immutable: Immutable,
                refs: [ConfigurationRecord]
            }
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(logger, epicMiddleware, perflogger),
    // other store enhancers if any
);

declare const module: any;

export function configureStore() {
    const store = createStore(reducer, new AppStoreRecord(), enhancer);
    if (module.hot) {
        module.hot.accept('./reducers/RootReducer', () => {
            console.log('Store Changed');
            store.replaceReducer(require('./reducers/RootReducer').default);
        });
    }
    return store;
}