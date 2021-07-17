import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";

import middleware from "./middleware";
import userReducer from "./userReducer";
import rollReducer from "./rollReducer";

const rootreducers = combineReducers({user: userReducer,roll: rollReducer})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootreducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(middleware);
