import { createHashHistory } from "history";

import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import rootReducer from "@Redux/Reducers/index";

export const history = createHashHistory({
  basename: ''
});

const store = createStore(
  connectRouter(history)(rootReducer),
  {},
  compose(applyMiddleware(routerMiddleware(history)))
);

store.subscribe(() => {
  let state = store.getState();
  localStorage.setItem('store', JSON.stringify(state));
  console.log(store.getState());
});
export default store;
