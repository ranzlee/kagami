import { applyMiddleware, createStore } from "redux";
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

//var thunk = require("redux-thunk");
//var promise = require("redux-promise-middleware");

import reducer from "./reducers";

const logger = createLogger( {
    // .. options
});

//const middleware = applyMiddleware(promise(), thunk, logger());
const middleware = applyMiddleware(logger, ReduxThunk);

export const Store = createStore(reducer, middleware);