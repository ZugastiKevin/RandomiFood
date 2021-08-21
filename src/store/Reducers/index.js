import { combineReducers } from "redux";
import LogReducer from "../Log/LogReducer";

export default combineReducers({
  logReducer: LogReducer,
});
