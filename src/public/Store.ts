import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics/RootEpic';
import { perflogger } from 'redux-perf-middleware';
import * as Immutable from 'immutable';
import reducer from "./reducers/Index";
import { ConfigurationRecord } from "./../shared/models/configuration/Configuration";

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

export const Store = createStore(reducer, enhancer);