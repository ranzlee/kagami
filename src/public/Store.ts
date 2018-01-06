import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics/RootEpic';
import { perflogger } from 'redux-perf-middleware';



import reducer from "./reducers/Index";

const logger = createLogger({
    // .. options
});

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers =
    typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "KAGAMI"
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(logger, epicMiddleware, perflogger),
    // other store enhancers if any
);

export const Store = createStore(reducer, enhancer);