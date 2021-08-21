import Cookies from "js-cookie";
import { LOG_OUT, LOG_SUCCESS, LOG_FAILURE } from "./LogTypes";

const cookie = Cookies.get("id");

const initialState = {
  logged: cookie ? true : false,
  data: [],
  error: "",
  token: Cookies.get("token"),
  userID: Cookies.get("id"),
  is_admin: false,
};

const LogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        logged: action.logged,
        is_admin: action.is_admin,
      };
    case LOG_SUCCESS:
      return {
        ...state,
        data: action.data,
        logged: action.logged,
        token: Cookies.get("token"),
        userID: action.data.id,
        is_admin: action.data.is_admin,
      };
    case LOG_FAILURE:
      return {
        ...state,
        error: action.error,
        logged: action.logged,
        is_admin: action.is_admin,
      };
    default:
      return state;
  }
};

export default LogReducer;
