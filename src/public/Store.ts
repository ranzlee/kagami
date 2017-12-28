import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics/RootEpic';



import reducer from "./reducers/Index";

const logger = createLogger( {
    // .. options
});

const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = applyMiddleware(logger, epicMiddleware);

export const Store = createStore(reducer, middleware);