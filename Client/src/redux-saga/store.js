import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";

function* exampleSaga() {
  console.log("Example saga reached");
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(exampleSaga);
