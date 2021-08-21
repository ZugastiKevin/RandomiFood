import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import RootReducer from "./Reducers";

export const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
  )
);
